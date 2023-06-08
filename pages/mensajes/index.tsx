import { LeftMenu, MessagesCategories } from '@/components/ui'
import { IChatId, IChatMessage } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io('https://server-production-e234.up.railway.app')

const MessagePage = () => {

  const [chatIds, setChatIds] = useState<IChatId[]>([])
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [chatId, setChatId] = useState('')

  const chatIdRef = useRef(chatId)
  const messagesRef = useRef(messages)
  const containerRef = useRef<HTMLDivElement>(null)

  const getChats = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/chat')
    setChatIds(response.data)
  }

  useEffect(() => {
    getChats()
  }, [])

  useEffect(() => {
    const interval = setInterval(getChats, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    chatIdRef.current = chatId
  }, [chatId])

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
    socket.on('message', async (message) => {
      if (chatIdRef.current === message.senderId) {
        setMessages(messagesRef.current.concat([{ senderId: message.senderId, message: message.message, agent: true, adminView: true, userView: true }]))
        setTimeout(async () => {
          await axios.put(`https://server-production-e234.up.railway.app/chat/${message.senderId}`)
        }, 1000)
      }
    })

    return () => {
      socket.off('message', message => console.log(message))
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
            <div className='w-1/2 flex flex-col gap-2'>
              {
                chatIds?.map((chat, i: any) => {
                  const createdAt = new Date(chat.createdAt!)
                  return (
                    <button onClick={async () => {
                      const response = await axios.get(`https://server-production-e234.up.railway.app/chat/${chat.senderId}`)
                      setMessages(response.data)
                      setChatId(chat.senderId)
                      await axios.put(`https://server-production-e234.up.railway.app/chat/${chat.senderId}`)
                      getChats()
                    }} key={i} className='bg-white w-full text-left h-20 p-2 rounded-xl flex gap-4 justify-between dark:bg-neutral-700/60 hover:bg-neutral-200/40 dark:hover:bg-neutral-700'>
                      <div className='mt-auto mb-auto'>
                        <p>{chat.senderId}</p>
                        <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                      </div>
                      {
                        chat.adminView === false
                          ? <div className=' mt-auto mb-auto w-3 h-3 rounded-full bg-main' />
                          : ''
                      }
                    </button>
                  )
                })
              }
              {
                chatIds.length
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
                                <div className='bg-neutral-200 p-1.5 rounded-md w-fit text-black'>
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
                  setMessages(messages.concat({senderId: chatId, response: newMessage, agent: true, adminView: true}))
                  const newMe = newMessage
                  setNewMessage('')
                  socket.emit('messageAdmin', { senderId: chatId, response: newMe, adminView: true })
                  axios.post('https://server-production-e234.up.railway.app/chat/create', {senderId: chatId, response: newMe, agent: true, adminView: true})
                  getChats()
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

export default MessagePage