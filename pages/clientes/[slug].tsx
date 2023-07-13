import { LeftMenu, Spinner, Spinner2 } from '@/components/ui'
import { IClient, ISell } from '@/interfaces'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

const ClientPage = () => {

  const [clientData, setClientData] = useState<Partial<IClient>>()
  const [tags, setTags] = useState([])
  const [loadingClientTag, setLoadingClientTag] = useState(false)
  const [newClientTag, setNewClientTag] = useState('')
  const [clientSells, setClientSells] = useState<ISell[]>([])

  const router = useRouter()

  const getClientData = async () => {
    const slug = router.asPath.replace('/clientes/', '')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients/${slug}`)
    setClientData(response.data)
    const sells = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sells-client/${response.data.email}`)
    setClientSells(sells.data)
  }

  useEffect(() => {
    getClientData()
  }, [])

  const getClientTags = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`)
    setTags(data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  return (
    <>
      <Head>
        <title>Cliente: {clientData?._id}</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] overflow-y-scroll dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)' }}>
          {
            clientData
              ? (
                <>
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
                        {
                          clientSells.length
                            ? clientSells.map(sell => (
                              <div onClick={() => router.push(`/ventas/${sell._id}`)} className='flex gap-4 cursor-pointer justify-between hover:bg-neutral-200 pt-4 pb-4 rounded pl-2 pr-2 dark:hover:bg-neutral-700' key={sell._id}>
                                <p className='mt-auto mb-auto text-sm'>{sell.pay}</p>
                                <p className='mt-auto mb-auto text-sm'>{sell.state}</p>
                                <p className='mt-auto mb-auto text-sm'>{sell.shippingMethod}</p>
                                <p className='mt-auto mb-auto text-sm'>{sell.shippingState}</p>
                                <p className='mt-auto mb-auto text-sm'>${NumberFormat(sell.total)}</p>
                              </div>
                            ))
                            : (
                              <div className="flex w-full">
                                <div className="m-auto mt-16 mb-16">
                                  <Spinner />
                                </div>
                              </div>
                            )
                        }
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
                        <div className='mb-4'>
                          <h2 className='mb-4'>Tags</h2>
                          {
                            tags?.length
                              ? <div className='flex gap-2'>
                                {
                                  tags.map((tag: any) => (
                                    <div className='flex gap-1' key={tag.tag}>
                                      <input onChange={async (e: any) => {
                                        if (clientData.tags) {
                                          if (e.target.checked) {
                                            const tags = clientData.tags.concat(e.target.value)
                                            setClientData({...clientData, tags: tags})
                                            const updated = {...clientData, tags: tags}
                                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, updated)
                                          } else {
                                            const filter = clientData.tags.filter(tag => tag !== e.target.value)
                                            setClientData({...clientData, tags: filter})
                                            const updated = {...clientData, tags: filter}
                                            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, updated)
                                          }
                                        } else {
                                          setClientData({...clientData, tags: [e.target.value]})
                                          const updated = {...clientData, tags: [e.target.value]}
                                          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientData._id}`, updated)
                                        }
                                      }} value={tag.tag} type='checkbox' checked={clientData.tags?.find(e => e === tag.tag) ? true : false} />
                                      <p className='text-sm'>{tag.tag}</p>
                                    </div>
                                  ))
                                }
                              </div>
                              : <p>No hay tags creados</p>
                          }
                        </div>
                        <div>
                          <h3 className='text-sm mb-2'>Nuevo tag</h3>
                          <div className='flex gap-2'>
                            <input type='text' placeholder='Nuevo tag' onChange={(e: any) => setNewClientTag(e.target.value)} value={newClientTag} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                            <button onClick={async (e: any) => {
                              e.preventDefault()
                              setLoadingClientTag(true)
                              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/client-tag`, { tag: newClientTag })
                              setNewClientTag('')
                              setLoadingClientTag(false)
                              getClientTags()
                            }} className='bg-main text-white text-sm rounded-md h-8 w-20'>{loadingClientTag ? <Spinner2 /> : 'Crear'}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )
              : (
                <div className="flex w-full mt-32">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
          }
        </div>
      </LeftMenu>
    </>
  )
}

export default ClientPage