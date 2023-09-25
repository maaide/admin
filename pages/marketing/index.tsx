import { LeftMenu } from '@/components/ui'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const MarketingPage = () => {
  return (
    <>
      <Head>
        <title>Marketing</title>
      </Head>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 70px)', overflow: 'overlay' }}>
          <div className='w-full max-w-1280 m-auto'>
            <div className='flex gap-2 justify-between w-full mb-4'>
              <h1 className='text-xl'>Marketing</h1>
              <div className='flex gap-2'>
                <Link href='/marketing/automatizaciones/nueva-automatizacion' className='pt-1.5 pb-1.5 pl-7 pr-7'>Crear automatización</Link>
                <Link href='/marketing/campanas/nueva-campana' className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white'>Crear campaña</Link>
              </div>
            </div>
            <div className='flex gap-4 w-full max-w-1280 m-auto'>
              <Link className='p-6 bg-white rounded-md shadow dark:bg-neutral-800' href='/marketing/campanas'>Campañas</Link>
              <Link className='p-6 bg-white rounded-md shadow dark:bg-neutral-800' href='/marketing/automatizaciones'>Automatizaciones</Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default MarketingPage