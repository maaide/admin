import { LeftMenu, Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'

const Configuration = () => {

  const [loading, setLoading] = useState(false)
  const [domain, setDomain] = useState('')

  const getDomain = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/domain`)
    if (response.data) {
      setDomain(response.data.domain)
    }
  }

  useEffect(() => {
    getDomain()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/domain`, { domain: domain })
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Configuración</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-40 h-8'>{loading ? <Spinner2 /> : 'Guardar datos'}</button>
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
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
              </div>
            </div>
            <div className='w-3/4'>
              <h2 className='text-lg mt-3 pb-3 mb-4 border-b dark:border-neutral-700'>Configuración del dominio</h2>
              <div className='bg-white border mb-4 flex flex-col gap-2 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h3 className='mb-4'>Cambio de dominio</h3>
                <p className='text-sm'>Este cambio tiene un tiempo de demora de maximo un día habil, se le enviara un email cuando el cambio se haya realizado</p>
                <div className='flex gap-2'>
                  <p className='text-sm my-auto'>Dominio</p>
                  <input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setDomain(e.target.value)} value={domain} placeholder='Dominio' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default Configuration