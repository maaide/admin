import { LeftMenu, Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'

const PoliticsPage = () => {

  const [politics, setPolitics] = useState({
    shipping: '',
    privacy: '',
    devolutions: ''
  })
  const [loading, setLoading] = useState(false)

  const getPolitics = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/politics')
    setPolitics(response.data)
  }

  useEffect(() => {
    getPolitics()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPolitics({ ...politics, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post('https://server-production-e234.up.railway.app/politics', politics)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Politicas de la tienda</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-40 h-8'>{loading ? <Spinner2 /> : 'Guardar datos'}</button>
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900 mb-16' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex w-full max-w-1280 m-auto gap-8 mb-4'>
            <div className='bg-white w-1/4 h-fit shadow-md p-4 rounded-md dark:bg-neutral-800'>
              <div className='mb-4'>
                <h1 className='text-lg pb-2 border-b dark:border-neutral-700'>Configuración</h1>
              </div>
              <div className='flex flex-col gap-2'>
                <Link href='/configuracion'>Información de la tienda</Link>
                <Link href='/configuracion/pasarela-de-pago'>Pasarela de pago</Link>
                <Link href='/configuracion/plan'>Plan</Link>
                <Link href='/configuracion/politicas'>Politicas</Link>
                <Link href='/configuracion/dominio'>Dominio</Link>
                <Link href='/configuracion/envios'>Envíos</Link>
                <Link href='/configuracion/mensajes'>Mensajes</Link>
              </div>
            </div>
            <div className='w-3/4 flex flex-col gap-4'>
              <h2 className='text-lg mt-3 pb-3 border-b dark:border-neutral-700'>Politicas de la tienda</h2>
              <div className='flex flex-col gap-2'>
                <h3>Politicas de envíos</h3>
                <textarea onChange={handleChange} name='shipping' value={politics.shipping} placeholder='Politicas de envíos' className='w-full mb-1 p-1.5 border rounded text-sm font-light h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3>Politicas de privacidad</h3>
                <textarea onChange={handleChange} name='privacity' value={politics.privacy} placeholder='Politicas de privacidad' className='w-full mb-1 p-1.5 border rounded text-sm font-light h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3>Politicas de devoluciones y reembolsos</h3>
                <textarea onChange={handleChange} name='devolutions' value={politics.devolutions} placeholder='Politicas de devoluciones' className='w-full mb-1 p-1.5 border rounded text-sm font-light h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default PoliticsPage