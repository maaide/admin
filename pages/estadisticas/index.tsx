import { LeftMenu } from '@/components/ui'
import Head from 'next/head'
import React from 'react'

const StadisticsPage = () => {
  return (
    <>
      <Head>
        <title>Estadisticas</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Estadisticas</h1>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default StadisticsPage