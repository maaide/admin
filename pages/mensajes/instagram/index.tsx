import { LeftMenu, MessagesCategories } from '@/components/ui'
import { IInstagramId, IInstagramMessage } from '@/interfaces/'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io('https://server-production-e234.up.railway.app')

const InstagramMessages = () => {
  
  const [instagramIds, setInstagramIds] = useState<IInstagramId[]>([])
  const [messages, setMessages] = useState<IInstagramMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedInstagramId, setSelectedInstagramId] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef(messages)
  const selectedInstagramIdRef = useRef(selectedInstagramId)

  const getMessages = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/instagram')
    setInstagramIds(response.data)
  }

  useEffect(() => {
    getMessages()
  }, [])

  useEffect(() => {
    const interval = setInterval(getMessages, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    selectedInstagramIdRef.current = selectedInstagramId
  }, [selectedInstagramId])

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
    socket.on('instagram', async (message) => {
      if (selectedInstagramIdRef.current === message.instagramId) {
        setMessages(messagesRef.current.concat([{ instagramId: message.instagramId, message: message.message, agent: true, view: true }]))
        await axios.put(`https://server-production-e234.up.railway.app/instagram/${message.phone}`)
        getMessages()
      }
    })

    return () => {
      socket.off('instagram', message => console.log(message))
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
                instagramIds?.map(instagram => (
                  <button onClick={async () => {
                    const response = await axios.get(`https://server-production-e234.up.railway.app/instagram/${instagram.instagramId}`)
                    setMessages(response.data)
                    setSelectedInstagramId(instagram.instagramId)
                    await axios.put(`https://server-production-e234.up.railway.app/instagram/${instagram.instagramId}`)
                    getMessages()
                  }} key={instagram.instagramId} className='bg-white w-full text-left h-20 p-2 rounded-xl dark:bg-neutral-700/60 hover:bg-neutral-200/40 dark:hover:bg-neutral-700'>
                    <p>{instagram.instagramId}</p>
                    {
                      instagram.view === false
                        ? <div className=' mt-auto mb-auto w-3 h-3 rounded-full bg-main' />
                        : ''
                    }
                  </button>
                ))
              }
            </div>
            <div className='w-1/2'>
              <div className='bg-white pt-4 pb-4 pl-4 flex flex-col gap-4 justify-between shadow-md rounded-xl w-full h-[70vh] dark:bg-neutral-700/60'>
                <div ref={containerRef} className='w-full h-full pr-4' style={{ overflow: 'overlay' }}>
                  {
                    messages?.map(message => (
                      <div key={message._id} className='flex flex-col gap-2 mb-2'>
                        {
                          message.message
                            ? (
                              <div className='bg-neutral-200 p-1.5 rounded-md w-fit text-black'>
                                <p>{message.message}</p>
                              </div>
                            )
                            : ''
                        }
                        {
                          message.response
                            ? (
                              <div className='bg-main text-white p-1.5 rounded-md w-fit ml-auto'>
                                <p>{message.response}</p>
                              </div>
                            )
                            : ''
                        }
                      </div>
                    ))
                  }
                </div>
                <form onSubmit={async (e: any) => {
                  e.preventDefault()
                  setMessages(messages.concat({instagramId: selectedInstagramId, response: newMessage, agent: true}))
                  const newMe = newMessage
                  setNewMessage('')
                  axios.post('https://server-production-e234.up.railway.app/messenger', {instagramId: selectedInstagramId, response: newMe, agent: true})
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

export default InstagramMessages