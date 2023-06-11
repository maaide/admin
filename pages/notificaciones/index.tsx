import { LeftMenu, Spinner } from '@/components/ui'
import { INotification } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('https://server-production-e234.up.railway.app')

const NotificationsPage = () => {

  const [notifications, setNotifications] = useState<INotification[]>()

  const router = useRouter()

  const getNotifications = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/notifications')
    setNotifications(response.data)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  useEffect(() => {
    getNotifications()
  }, [router.asPath])

  return (
    <>
      <Head>
        <title>Notificaciones</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex flex-col gap-2 bg-white shadow-md p-4 rounded-xl justify-between w-full max-w-[900px] m-auto mb-4'>
            <h1 className='text-xl p-2'>Notificaciones</h1>
            <div className='flex flex-col gap-2'>
              {
                notifications === undefined
                  ? (
                    <div className='w-full flex mt-10 mb-10'>
                      <div className='m-auto w-fit'>
                        <Spinner />
                      </div>
                    </div>
                  )
                  : notifications.length
                    ? notifications.map(notification => {
                      const createdAt = new Date(notification.createdAt!)
                      return (
                        <Link href={notification.url} key={notification._id} className='flex gap-4 justify-between hover:bg-neutral-100 p-2 rounded-md' onClick={async () => {
                          await axios.put(`https://server-production-e234.up.railway.app/notifications/${notification._id}`)
                          socket.emit('newNotification', true)
                          getNotifications()
                        }}>
                          <div>
                            <p>{notification.title}</p>
                            <p>{notification.description}</p>
                            <p className='text-sm text-neutral-600 dark:text-neutral-400'>{createdAt.getDay()}/{createdAt.getMonth() + 1} {createdAt.getHours()}:{createdAt.getMinutes() < 10 ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}</p>
                          </div>
                          {
                            notification.view
                              ? ''
                              : <div className='w-3 h-3 rounded-full bg-main mt-auto mb-auto' />
                          }
                        </Link>
                      )
                    })
                    : <p>No hay notificaciones</p>
              }
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default NotificationsPage