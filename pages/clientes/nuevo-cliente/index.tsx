import { ShippingCost } from '@/components/product'
import { LeftMenu, Spinner2 } from '@/components/ui'
import { IClient } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

const NewClient = () => {

  const [clientData, setClientData] = useState<IClient>({
    email: ''
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [clientTags, setClientTags] = useState([])
  const [newClientTag, setNewClientTag] = useState('')
  const [loadingClientTag, setLoadingClientTag] = useState(false)

  const router = useRouter()

  const initialEmail = ''

  const getClientTags = async () => {
    const tags = await axios.get('https://server-production-e234.up.railway.app/client-tag')
    setClientTags(tags.data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const inputChange = (e: any) => {
    setClientData({...clientData, [e.target.name]: e.target.value})
  }

  const submitForm = async () => {
    setSubmitLoading(true)
    await axios.post('https://server-production-e234.up.railway.app/clients', clientData)
    setSubmitLoading(false)
    router.push('/clientes')
  }

  return (
    <>
      <Head>
        <title>Nuevo cliente</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              {
                clientData.email === initialEmail
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4'>Crear cliente</button>
                  : <button onClick={submitForm} className='bg-main text-white text-sm rounded-md w-36 h-8'>{submitLoading ? <Spinner2 /> : 'Crear cliente'}</button>
              }
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/clientes'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] mb-16 overflow-y-scroll dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)' }}>
          <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
            <Link href='/clientes' className='border rounded p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl mt-auto mb-auto'>Nuevo cliente</h1>
          </div>
          <form className='flex gap-4 max-w-1280 m-auto'>
            <div className='flex gap-4 flex-col w-2/3'>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Datos</h2>
                <div className='flex gap-2 mb-4'>
                  <div className='w-1/2'>
                    <h3 className='mb-2 font-light text-sm'>Nombre</h3>
                    <input type='text' placeholder='Nombre' name='firstName' onChange={inputChange} value={clientData.firstName} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                  <div className='w-1/2'>
                    <h3 className='mb-2 font-light text-sm'>Apellido</h3>
                    <input type='text' placeholder='Apellido' name='lastName' onChange={inputChange} value={clientData.lastName} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
                <div className='mb-4'>
                  <h3 className='mb-2 font-light text-sm'>Correo electronico</h3>
                  <input type='text' placeholder='Correo' name='email' onChange={inputChange} value={clientData.email} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div>
                  <h3 className='mb-2 font-light text-sm'>Telefono</h3>
                  <div className='flex gap-2'>
                    <p className='border m-auto pt-1 pb-1 pl-2 pr-2 rounded'>+56</p>
                    <input type='text' placeholder='Telefono' name='phone' onChange={inputChange} value={clientData.phone} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Dirección</h2>
                <div className='mb-4'>
                  <h3 className='mb-2 font-light text-sm'>Calle</h3>
                  <input type='text' placeholder='Calle' name='address' onChange={inputChange} value={clientData.address} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <h3 className='mb-2 font-light text-sm'>Departamento, local, etc. (Opcional)</h3>
                  <input type='text' placeholder='Departamento' name='departament' onChange={inputChange} value={clientData.departament} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <ShippingCost setClientData={setClientData} clientData={clientData} />
              </div>
            </div>
            <div className='flex gap-4 flex-col w-1/3'>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <div className='mb-4'>
                  <h3 className='mb-2 text-sm'>Tags</h3>
                  {
                    clientTags?.length
                      ? <div className='flex gap-2'>
                        {
                          clientTags.map((tag: any) => (
                            <div className='flex gap-1'>
                              <input onChange={(e: any) => {
                                if (clientData.tags) {
                                  if (e.target.checked) {
                                    const tags = clientData.tags.concat(e.target.value)
                                    setClientData({...clientData, tags: tags})
                                  } else {
                                    const filter = clientData.tags.filter(tag => tag !== e.target.value)
                                    setClientData({...clientData, tags: filter})
                                  }
                                } else {
                                  setClientData({...clientData, tags: [e.target.value]})
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
                      await axios.post('https://server-production-e234.up.railway.app/client-tag', { tag: newClientTag })
                      setNewClientTag('')
                      setLoadingClientTag(false)
                      getClientTags()
                    }} className='bg-main text-white text-sm rounded-md h-8 w-20'>{loadingClientTag ? <Spinner2 /> : 'Crear'}</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </LeftMenu>
    </>
  )
}

export default NewClient