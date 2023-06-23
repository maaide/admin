import { LeftMenu, Spinner } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const AutomatizationsPage = () => {

  const [loading, setLoading] = useState(false)
  const [automatizations, setAutomatizations] = useState([])

  const getAutomatizations = async () => {
    setLoading(true)
    const response = await axios.get('https://server-production-e234.up.railway.app/automatizations')
    setAutomatizations(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getAutomatizations()
  }, [])

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
          <div className='w-full max-w-1280 m-auto'>
            {
              loading
                ? (
                  <div className='w-full flex mt-20'>
                    <div className='m-auto w-fit'>
                      <Spinner />
                    </div>
                  </div>
                )
                : automatizations.length
                  ? (
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          automatizations.map(automatization => {
                            return <p key={automatization}></p>
                          })
                        }
                      </tbody>
                    </table>
                  )
                  : ''
            }
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default AutomatizationsPage