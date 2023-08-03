import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineHome, AiOutlineDollarCircle, AiOutlineFund, AiOutlineNotification, AiOutlineMessage } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { HiOutlineUsers } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { BsShop } from 'react-icons/bs'
import { TfiWrite } from 'react-icons/tfi'

export const LeftMenu: React.FC<PropsWithChildren> = ({ children }) => {

  const router = useRouter()

  return (
    <div className='fixed flex w-full' style={{ height: 'calc(100% - 56px)' }}>
      <div className='w-64 border-r pt-6 pb-6 pl-4 pr-4 flex flex-col justify-between dark:border-neutral-800'>
        <div className='flex flex-col gap-2'>
          <Link href='/' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><AiOutlineHome className='mt-auto mb-auto text-xl text-main' />Inicio</Link>
          <Link href='/ventas' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><AiOutlineDollarCircle className='mt-auto mb-auto text-xl text-main' />Ventas</Link>
          <Link href='/productos' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><MdOutlineLocalOffer className='mt-auto mb-auto text-xl text-main' />Productos</Link>
          {
            router.asPath.includes('productos')
              ? (
                <>
                  <div className='flex flex-col gap-2'>
                    <Link href='/productos/categorias' className='font-light text-neutral-400 flex gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'>Categorias</Link>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Link href='/productos/codigos-promocionales' className='font-light text-neutral-400 flex gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'>Codigos promocionales</Link>
                  </div>
                </>
              )
              : ''
          }
          <Link href='/estadisticas' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><AiOutlineFund className='mt-auto mb-auto text-xl text-main' />Estadisticas</Link>
          <Link href='/clientes' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><HiOutlineUsers className='mt-auto mb-auto text-xl text-main' />Clientes</Link>
          <Link href='/marketing' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><AiOutlineNotification className='mt-auto mb-auto text-xl text-main' />Marketing</Link>
          {
            router.asPath.includes('marketing')
              ? (
                <>
                  <div className='flex flex-col gap-2'>
                    <Link href='/marketing/campanas' className='font-light text-neutral-400 flex gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'>Campañas</Link>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Link href='/marketing/automatizaciones' className='font-light text-neutral-400 flex gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'>Automatizaciones</Link>
                  </div>
                </>
              )
              : ''
          }
          <Link href='/mensajes' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><AiOutlineMessage className='mt-auto mb-auto text-xl text-main' />Mensajes</Link>
          <Link href='/blog' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><TfiWrite className='mt-auto mb-auto text-xl text-main' />Blog</Link>
          <Link href='/diseno' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BsShop className='mt-auto mb-auto text-xl text-main' />Diseño</Link>
        </div>
        <div className='border-t pt-4 dark:border-neutral-800'>
          <Link href='/configuracion' className='font-light flex gap-2 rounded pt-1 pb-1 pl-2 pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-800'><IoSettingsOutline className='mt-auto mb-auto text-xl text-main' />Configuración</Link>
        </div>
      </div>
      { children }
    </div>
  )
}
