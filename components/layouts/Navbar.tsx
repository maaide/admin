import { INotification } from '@/interfaces'
import axios from 'axios'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { IoMdClose } from 'react-icons/io'
import { io } from 'socket.io-client'

const socket = io('https://server-production-e234.up.railway.app')

export const Navbar: React.FC<PropsWithChildren> = ({ children }) => {

  const { systemTheme, theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState('block')
  const [notificationsView, setNotificationsView] = useState(false)
  const [notifications, setNotifications] = useState<INotification[]>([])

  const notificationsRef = useRef(notifications)

  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const getNotifications = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/notifications/ultimate')
    setNotifications(response.data)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  useEffect(() => {
    notificationsRef.current = notifications
  }, [notifications])

  useEffect(() => {
    socket.on('message', async (message) => {
      if (message.message) {
        await axios.post('https://server-production-e234.up.railway.app/notification', {title: 'Nuevo mensaje: Chat web', description: message.message, url: '/mensajes', view: false})
        getNotifications()
      }
    })

    return () => {
      socket.off('message', message => console.log(message))
    }
  }, [])

  useEffect(() => {
    socket.on('newNotification', async () => {
      getNotifications()
    })
  }, [])

  const renderThemeChanger = () => {
    if ( !mounted ) return null
    const currentTheme = theme === 'system' ? systemTheme : theme
    if ( currentTheme === 'dark' ) {
      return (
        <button onClick={() => setTheme('light')}><BsFillMoonFill className='text-slate-600' /></button>
      )
    } else {
      return (
        <button onClick={() => setTheme('dark')}><BsFillSunFill className='text-slate-500' /></button>
      )
    }
  }

  return (
    <>
      <div className={`${loading} fixed h-full w-full z-50 bg-white`} />
      <div className='fixed w-full pl-2 pr-2 border-b z-50 dark:border-neutral-800'>
        <div className='w-full m-auto flex justify-between'>
          <div className='flex gap-2'>
            {
              !mounted
                ? <Link href='/'><div className='h-14 w-1' /></Link>
                : theme === 'system'
                  ? systemTheme === 'dark'
                    ? <Link href='/'><img className='h-14' onLoad={() => setLoading('hidden')} src='https://res.cloudinary.com/blasspod/image/upload/v1664841660/blaspod/jjfme7pn7hnlhniuiab3.png' /></Link>
                    : <Link href='/'><img className='h-14' onLoad={() => setLoading('hidden')} src='https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png' /></Link>
                  : theme === 'dark'
                    ? <Link href='/'><img className='h-14' onLoad={() => setLoading('hidden')} src='https://res.cloudinary.com/blasspod/image/upload/v1664841660/blaspod/jjfme7pn7hnlhniuiab3.png' /></Link>
                    : <Link href='/'><img className='h-14' onLoad={() => setLoading('hidden')} src='https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png' /></Link>
            }
          </div>
          <div className='flex gap-4'>
            {renderThemeChanger()}
            <button onClick={(e: any) => {
              e.preventDefault()
              if (notificationsView) {
                setNotificationsView(false)
              } else {
                setNotificationsView(true)
              }
            }}>{notificationsView ? <IoMdClose className='m-auto text-2xl' /> : <IoIosNotificationsOutline className='m-auto text-2xl' />}</button>
            <button className='font-light'>Jorge Tapia</button>
          </div>
        </div>
      </div>
      <div className='w-full h-14' />
      {
        notificationsView
          ? (
            <div className='w-full absolute z-50 flex' onClick={(e: any) => {
              e.preventDefault()
              setNotificationsView(false)
            }} style={{ height: 'calc(100% - 56px)' }}>
              <div className='mt-[1px] mr-2 p-4 h-fit max-h-[500px] ml-auto rounded-md shadow-md bg-white z-50 w-[350px] dark:bg-neutral-800' style={{ overflow: 'overlay' }}>
                <p className='mb-4 text-lg border-b pb-2 mt-2 ml-2 mr-2 dark:border-neutral-600'>Notificaciones</p>
                {
                  notifications.length
                    ? (
                      <div className='flex flex-col gap-2'>
                        {
                          notifications.map(notification => {
                            const createdAt = new Date(notification.createdAt!)
                            return (
                              <Link className='hover:bg-neutral-100 p-2 rounded-md flex gap-4 justify-between dark:hover:bg-neutral-700' href={notification.url} key={notification.description} onClick={async () => {
                                await axios.put(`https://server-production-e234.up.railway.app/notifications/${notification._id}`)
                                getNotifications()
                              }}>
                                <div className='mt-auto mb-auto'>
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
                        }
                        <Link href='/notificaciones' className='text-main text-center hover:bg-neutral-100 p-2 rounded-md dark:hover:bg-neutral-700'>Ver todos</Link>
                      </div>
                    )
                    : <p>No hay notificaciones</p>
                }
              </div>
            </div>
          )
          : ''
      }
      { children }
    </>
  )
}
