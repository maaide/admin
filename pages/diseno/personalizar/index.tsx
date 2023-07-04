import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

const PersonalizePage = () => {

  const [part, setPart] = useState('')

  return (
    <>
      <Head>
        <title>Personalizar sitio web</title>
      </Head>
      <div className='fixed flex w-full' style={{ height: 'calc(100% - 56px)' }}>
        <div className='w-[500px] border-r pt-6 pb-6 pl-4 pr-4 flex flex-col justify-between dark:border-neutral-800'>
          {
            part === ''
              ? (
                <div className='flex flex-col gap-2'>
                  <div className='border-b pb-4'>
                    <Link href='/diseno' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></Link>
                  </div>
                  <button onClick={() => setPart('Encabezado')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Encabezado</p></button>
                  <button onClick={() => setPart('Inicio')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Pagina de inicio</p></button>
                  <button onClick={() => setPart('Producto')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Pagina de producto</p></button>
                  <button onClick={() => setPart('Contacto')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Pagina de contacto</p></button>
                  <button onClick={() => setPart('Tienda')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Tienda</p></button>
                  <button onClick={() => setPart('Suscripcion')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Zona de suscripción</p></button>
                </div>
              )
              : ''
          }
          {
            part === 'Encabezado'
              ? <p>Encabezado</p>
              : ''
          }
          {
            part === 'Inicio'
              ? (
                <div className='flex flex-col gap-4'>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    setPart('')
                  }} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  <p className='text-lg border-b pb-2'>Inicio</p>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Banner</p>
                    <input type='text' placeholder='Franja superior' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Producto'
              ? <p>Producto</p>
              : ''
          }
          {
            part === 'Contacto'
              ? <p>Contacto</p>
              : ''
          }
          {
            part === 'Tienda'
              ? <p>Tienda</p>
              : ''
          }
        </div>
        {
          part === 'Inicio' || part === 'Encabezado' || part === 'Suscripcion' || part === ''
            ? <iframe className='m-auto bg-white' src="https://tienda-1.vercel.app" width="100%" height="100%" />
            : ''
        }
        {
          part === 'Producto'
            ? <iframe className='m-auto bg-white' src="https://tienda-1.vercel.app/productos/airpods-pro" width="100%" height="100%" />
            : ''
        }
        {
          part === 'Contacto'
            ? <iframe className='m-auto bg-white' src="https://tienda-1.vercel.app/contacto" width="100%" height="100%" />
            : ''
        }
        {
          part === 'Tienda'
            ? <iframe className='m-auto bg-white' src="https://tienda-1.vercel.app/tienda" width="100%" height="100%" />
            : ''
        }
      </div>
    </>
  )
}

export default PersonalizePage