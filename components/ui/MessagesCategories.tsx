import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const MessagesCategories = () => {

const router = useRouter()

  return (
    <div className='flex gap-3'>
      <Link href='/mensajes' className={`${router.asPath === '/mensajes' ? 'bg-neutral-500 text-white' : 'bg-white dark:bg-neutral-700/60'} p-2 rounded-md shadow`}>Chatbot web</Link>
      <Link href='/mensajes/whatsapp' className={`${router.asPath === '/mensajes/whatsapp' ? 'bg-neutral-500 text-white' : 'bg-white dark:bg-neutral-700/60'} p-2 rounded-md shadow`}>Whatsapp</Link>
      <Link href='/mensajes/messenger' className={`${router.asPath === '/mensajes/messenger' ? 'bg-neutral-500 text-white' : 'bg-white dark:bg-neutral-700/60'} p-2 rounded-md shadow`}>Messenger</Link>
      <Link href='/mensajes/instagram' className={`${router.asPath === '/mensajes/instagram' ? 'bg-neutral-500 text-white' : 'bg-white dark:bg-neutral-700/60'} p-2 rounded-md shadow`}>Instagram</Link>
    </div>
  )
}
