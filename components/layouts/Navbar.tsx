import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'

export const Navbar: React.FC<PropsWithChildren> = ({ children }) => {

  const { systemTheme, theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState('block')
  const [notificationsView, setNotificationsView] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    setMounted(true)
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
            }}><IoIosNotificationsOutline className='m-auto text-2xl' /></button>
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
              <div className='mt-[1px] p-4 h-fit ml-auto rounded-md shadow-md bg-white z-50 w-80'>
                <p>Notificaciones</p>
              </div>
            </div>
          )
          : ''
      }
      { children }
    </>
  )
}
