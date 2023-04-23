import { LeftMenu, Spinner2 } from '@/components/ui'
import { IClient } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'

const ClientPage = () => {

  const [clientData, setClientData] = useState<IClient>({
    email: ''
  })
  const [submitLoading, setSubmitLoading] = useState(false)

  const router = useRouter()

  const getClientData = async () => {
    const slug = router.asPath.replace('/clientes/', '')
    const {data} = await axios.get(`https://server-production-e234.up.railway.app/clients/${slug}`)
    setClientData(data)
  }

  useEffect(() => {
    getClientData()
  }, [])

  return (
    <>
      <Head>
        <title>Cliente: {clientData._id}</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] overflow-y-scroll dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)' }}>
          <div className='flex gap-3 mb-4 max-w-1280 justify-between m-auto'>
            <div className='flex gap-3'>
              <Link href='/clientes' className='border rounded p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600'><BiArrowBack className='text-xl' /></Link>
              <h1 className='text-xl mt-auto mb-auto'>{ clientData.email }</h1>
            </div>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white' href={`/clientes/editar/${clientData._id}`}>Editar datos</Link>
          </div>
          <form className='flex gap-4 max-w-1280 m-auto'>
            <div className='flex gap-4 flex-col w-2/3'>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Pedidos</h2>
              </div>
            </div>
            <div className='flex gap-4 flex-col w-1/3'>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Datos</h2>
                <div className='mb-4'>
                  <h3 className='text-sm mb-2'>Nombre</h3>
                  <p className='text-sm'>{clientData.firstName} {clientData.lastName}</p>
                </div>
                <div className='mb-4'>
                  <h3 className='text-sm mb-2'>Email</h3>
                  <p className='text-sm'>{clientData.email}</p>
                </div>
                <div>
                  <h3 className='text-sm mb-2'>Telefono</h3>
                  <p className='text-sm'>{clientData.phone}</p>
                </div>
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Dirección</h2>
                <div className='mb-4'>
                  <h3 className='text-sm mb-2'>Calle</h3>
                  <p className='text-sm'>{clientData.address}</p>
                </div>
                <div>
                  <h3 className='text-sm mb-2'>Ciudad</h3>
                  <p className='text-sm'>{clientData.city}, {clientData.region}</p>
                </div>
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Tags</h2>
                {
                  clientData.tags?.length
                    ? clientData.tags.map(tag => (
                      <span className='bg-neutral-200 pt-1 flex w-fit pb-1 pl-2 pr-2 text-sm rounded'>{tag}<IoClose className='mt-auto mb-auto ml-1 cursor-pointer' /></span>
                    ))
                    : ''
                }
              </div>
            </div>
          </form>
        </div>
      </LeftMenu>
    </>
  )
}

export default ClientPage