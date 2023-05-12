import { ShippingCost } from '@/components/product'
import { LeftMenu } from '@/components/ui'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

const Configuration = () => {

  const [storeData, setStoreData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    region: '',
    city: ''
  })

  return (
    <>
      <Head>
        <title>Configuración</title>
      </Head>
      <LeftMenu>
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
              </div>
            </div>
            <div className='w-3/4'>
              <h2 className='text-lg mt-3 pb-3 mb-4 border-b dark:border-neutral-700'>Información de la tienda</h2>
              <div className='bg-white border mb-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h3 className='mb-4'>Información general</h3>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Nombre de la tienda</p>
                  <input type='text' placeholder='Nombre de la tienda' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Correo de la tienda</p>
                  <input type='text' placeholder='Correo de la tienda' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div>
                  <p className='text-sm mb-2'>Telefono de la tienda</p>
                  <div className='flex gap-2'>
                    <p className='text-sm mt-auto mb-auto'>+56</p>
                    <input type='text' placeholder='Telefono de la tienda' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h3 className='mb-4'>Ubicación de la tienda</h3>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Dirección</p>
                  <input type='text' placeholder='Dirección' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Departamento, local, etc. (opcional)</p>
                  <input type='text' placeholder='Dirección' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div>
                  <ShippingCost clientData={storeData} setClientData={setStoreData}  />
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