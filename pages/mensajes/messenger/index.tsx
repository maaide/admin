import { LeftMenu, MessagesCategories } from '@/components/ui'
import { IMessengerId, IMessengerMessage } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io('https://server-production-e234.up.railway.app')

const MessengerMessages = () => {

  const [messengerIds, setMessengerIds] = useState<IMessengerId[]>([])
  const [messages, setMessages] = useState<IMessengerMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedMessengerId, setSelectedMessengerId] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef(messages)
  const selectedMessengerIdRef = useRef(selectedMessengerId)

  const getMessages = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/messenger')
    setMessengerIds(response.data)
  }

  useEffect(() => {
    getMessages()
  }, [])

  useEffect(() => {
    const interval = setInterval(getMessages, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    selectedMessengerIdRef.current = selectedMessengerId
  }, [selectedMessengerId])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  useEffect(() => {
    socket.on('messenger', async (message) => {
      if (selectedMessengerIdRef.current === message.messengerId) {
        setMessages(messagesRef.current.concat([{ messengerId: message.messengerId, message: message.message, agent: true, view: true }]))
        setTimeout(async () => {
          await axios.put(`https://server-production-e234.up.railway.app/messenger/${message.messengerId}`)
        }, 1000)
      }
    })

    return () => {
      socket.off('messenger', message => console.log(message))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Mensajes</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl mb-4'>Mensajes</h1>
            <MessagesCategories />
          </div>
          <div className='w-full max-w-1280 flex m-auto gap-6'>
            <div className='w-1/2'>
              {
                messengerIds?.map(messenger => {
                  const createdAt = new Date(messenger.createdAt!)
                  return (
                    <button onClick={async () => {
                      const response = await axios.get(`https://server-production-e234.up.railway.app/messenger/${messenger.messengerId}`)
                      setMessages(response.data)
                      setSelectedMessengerId(messenger.messengerId)
                      await axios.put(`https://server-production-e234.up.railway.app/messenger/${messenger.messengerId}`)
                      getMessages()
                    }} key={messenger.messengerId} className='bg-white w-full text-left h-20 p-2 flex gap-2 justify-between rounded-xl dark:bg-neutral-700/60 hover:bg-neutral-200/40 dark:hover:bg-neutral-700'>
                      <div className='mt-auto mb-auto'>
                        <p>{messenger.messengerId}</p>
                        <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                      </div>
                      {
                        messenger.view === false
                          ? <div className=' mt-auto mb-auto w-3 h-3 rounded-full bg-main' />
                          : ''
                      }
                    </button>
                  )
                })
              }
              {
                messengerIds.length
                  ? ''
                  : <p>No hay chats</p>
              }
            </div>
            <div className='w-1/2'>
              <div className='bg-white pt-4 pb-4 pl-4 flex flex-col gap-4 justify-between shadow-md rounded-xl w-full h-[70vh] dark:bg-neutral-700/60'>
                <div ref={containerRef} className='w-full h-full pr-4' style={{ overflow: 'overlay' }}>
                  {
                    messages?.map(message => {
                      const createdAt = new Date(message.createdAt!)
                      return (
                        <div key={message._id} className='flex flex-col gap-2 mb-2'>
                          {
                            message.message
                              ? (
                                <div className='bg-neutral-200 flex flex-col p-1.5 rounded-md w-fit text-black'>
                                  <p>{message.message}</p>
                                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                </div>
                              )
                              : ''
                          }
                          {
                            message.response
                              ? (
                                <div className='bg-main flex flex-col text-white p-1.5 rounded-md w-fit ml-auto'>
                                  <p>{message.response}</p>
                                  <p className='text-sm ml-auto dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                                </div>
                              )
                              : ''
                          }
                        </div>
                      )
                    })
                  }
                </div>
                <form onSubmit={async (e: any) => {
                  e.preventDefault()
                  setMessages(messages.concat({messengerId: selectedMessengerId, response: newMessage, agent: true, view: false}))
                  const newMe = newMessage
                  setNewMessage('')
                  axios.post('https://server-production-e234.up.railway.app/messenger', {messengerId: selectedMessengerId, response: newMe, agent: true, view: false})
                  getMessages()
                }} className='flex gap-2 pr-4'>
                  <input onChange={(e: any) => setNewMessage(e.target.value)} value={newMessage} type='text' placeholder='Escribe tu mensaje' className='border p-1.5 w-full rounded-lg dark:border-neutral-600' />
                  <button type='submit' className='bg-main text-white w-24 rounded-md'>Enviar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default MessengerMessages