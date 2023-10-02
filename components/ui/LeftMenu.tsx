import Link from 'next/link'
import React, { PropsWithChildren, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineHome, AiOutlineDollarCircle, AiOutlineFund, AiOutlineNotification, AiOutlineMessage } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { HiOutlineUsers } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { BsShop } from 'react-icons/bs'
import { TfiWrite } from 'react-icons/tfi'

export const LeftMenu: React.FC<PropsWithChildren> = ({ children }) => {

  const [width, setWidth] = useState('w-[70px]')
  const [display, setDisplay] = useState('hidden')
  const [opacity, setOpacity] = useState('opacity-0')

  const router = useRouter()

  return (
    <div className='fixed flex w-full' style={{ height: 'calc(100% - 49px)' }}>
      <div onMouseEnter={() => {
        setWidth('w-[250px]')
        setTimeout(() => {
          setDisplay('flex')
          setTimeout(() => {
            setOpacity('opacity-1')
          }, 50)
        }, 100)
      }} onMouseLeave={() => {
        setWidth('w-[70px]')
        setOpacity('opacity-0')
        setTimeout(() => {
          setDisplay('hidden')
        }, 50)
      }} className={`${width} transition-all duration-200 z-50 bg-white border-r pt-6 pb-6 pl-4 pr-4 flex flex-col justify-between dark:border-neutral-800 dark:bg-neutral-900`}>
        <div className='flex flex-col gap-2'>
          <Link href='/' className={`font-light transition-all duration-200 ${router.asPath === '/' ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineHome className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Inicio</p></Link>
          <Link href='/ventas' className={`font-light transition-all duration-200 ${router.asPath.includes('/ventas') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineDollarCircle className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Ventas</p></Link>
          <Link href='/productos' className={`font-light transition-all duration-200 ${router.asPath.includes('/productos') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><MdOutlineLocalOffer className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Productos</p></Link>
          {
            router.asPath.includes('productos')
              ? (
                <>
                  <div className='flex flex-col gap-2'>
                    <Link href='/productos/categorias' className={`font-light transition-all duration-200 ${router.asPath.includes('/productos/categorias') ? 'bg-main/20' : ''} text-neutral-400 flex h-8 gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><p className={`${display} ${opacity} transition-all duration-100`}>Categorias</p></Link>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Link href='/productos/codigos-promocionales' className={`font-light transition-all duration-200 ${router.asPath.includes('/productos/codigos-promocionales') ? 'bg-main/20' : ''} text-neutral-400 flex h-8 gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><p className={`${display} ${opacity} transition-all duration-100`}>Codigos</p></Link>
                  </div>
                </>
              )
              : ''
          }
          <Link href='/estadisticas' className={`font-light transition-all duration-200 ${router.asPath.includes('/estadisticas') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineFund className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Estadisticas</p></Link>
          <Link href='/clientes' className={`font-light transition-all duration-200 ${router.asPath.includes('/clientes') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><HiOutlineUsers className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Clientes</p></Link>
          <Link href='/marketing' className={`font-light transition-all duration-200 ${router.asPath.includes('/marketing') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineNotification className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Marketing</p></Link>
          {
            router.asPath.includes('marketing')
              ? (
                <>
                  <div className='flex flex-col gap-2'>
                    <Link href='/marketing/campanas' className={`font-light transition-all duration-200 ${router.asPath.includes('/marketing/campanas') ? 'bg-main/20' : ''} text-neutral-400 flex h-8 gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><p className={`${display} ${opacity} transition-all duration-100`}>Campañas</p></Link>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Link href='/marketing/automatizaciones' className={`font-light transition-all duration-200 ${router.asPath.includes('/marketing/automatizaciones') ? 'bg-main/20' : ''} text-neutral-400 flex h-8 gap-2 pt-1 pb-1 pl-9 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><p className={`${display} ${opacity} transition-all duration-100`}>Automatizaciones</p></Link>
                  </div>
                </>
              )
              : ''
          }
          <Link href='/mensajes' className={`font-light transition-all duration-200 ${router.asPath.includes('/mensajes') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><AiOutlineMessage className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Mensajes</p></Link>
          <Link href='/blog' className={`font-light transition-all duration-200 ${router.asPath.includes('/blog') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><TfiWrite className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Blog</p></Link>
          <Link href='/diseno' className={`font-light transition-all duration-200 ${router.asPath.includes('/diseno') ? 'bg-main/20' : ''} flex h-8 gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800`}><BsShop className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Diseño</p></Link>
        </div>
        <div className='border-t pt-4 dark:border-neutral-800'>
          <Link href='/configuracion' className={`font-light transition-all duration-200 ${router.asPath.includes('/configuracion') ? 'bg-main/20' : ''} flex h-8 gap-2 rounded pt-1 pb-1 pl-2 pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-800`}><IoSettingsOutline className='mt-auto mb-auto text-xl text-main' /><p className={`${display} ${opacity} transition-all duration-100`}>Configuración</p></Link>
        </div>
      </div>
      { children }
    </div>
  )
}
