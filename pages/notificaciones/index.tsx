import { LeftMenu } from '@/components/ui'
import { INotification } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const NotificationsPage = () => {

  const [notifications, setNotifications] = useState<INotification[]>([])

  const getNotifications = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/notifications')
    setNotifications(response.data)
  }

  useEffect(() => {
    getNotifications()
  }, [])

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
                notifications.length
                  ? notifications.map(notification => (
                    <Link href={notification.url} className='hover:bg-neutral-100 p-2 rounded-md' key={notification._id}>
                      <p>{notification.title}</p>
                      <p>{notification.description}</p>
                    </Link>
                  ))
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