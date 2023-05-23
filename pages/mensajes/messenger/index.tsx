import { LeftMenu, MessagesCategories } from '@/components/ui'
import { IMessengerMessage } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const MessengerMessages = () => {

  const [messengerIds, setMessengerIds] = useState<[]>([])
  const [messages, setMessages] = useState<IMessengerMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedMessengerId, setSelectedMessengerId] = useState()

  const getMessages = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/messenger')
    setMessengerIds(response.data)
  }

  useEffect(() => {
    getMessages()
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
                messengerIds?.map(messengerId => (
                  <button onClick={async () => {
                    const response = await axios.get(`https://server-production-e234.up.railway.app/messenger/${messengerId}`)
                    setMessages(response.data)
                    setSelectedMessengerId(messengerId)
                  }} key={messengerId} className='bg-white w-full text-left pt-5 pb-5 pl-2 dark:bg-neutral-700/60'>
                    <p>{messengerId}</p>
                  </button>
                ))
              }
            </div>
            <div className='w-1/2'>
              <div className='bg-white p-4 flex flex-col gap-4 justify-between shadow-md rounded-xl w-full h-[70vh] dark:bg-neutral-700/60'>
                <div className='w-full h-full pr-6' style={{ overflow: 'overlay' }}>
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
                  setMessages(messages.concat({messengerId: selectedMessengerId, response: newMessage, agent: true}))
                  const newMe = newMessage
                  setNewMessage('')
                  axios.post('https://server-production-e234.up.railway.app/messenger', {messengerId: selectedMessengerId, response: newMe, agent: true})
                }} className='flex gap-2'>
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