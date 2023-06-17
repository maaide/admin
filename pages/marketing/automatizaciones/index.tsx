import { LeftMenu } from '@/components/ui'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const AutomatizationsPage = () => {
  return (
    <>
      <Head>
        <title>Automatizaciones</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Automatizaciones</h1>
            <Link href='/marketing/automatizaciones/nueva-automatizacion' className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white'>Crear automatización</Link>
          </div>
          <div>

          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default AutomatizationsPage