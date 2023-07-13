import { LeftMenu, Spinner2 } from '@/components/ui'
import { IClientTag, IEmail, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'

const NewCampaign = () => {

  const [email, setEmail] = useState<IEmail>({
    address: 'Todos los suscriptores',
    affair: '',
    title: 'Te damos la bienvenida a nuestra tienda',
    paragraph: '¡Hola ${name}! Nos hace muy felices tenerte con nosotros, aquí te dejamos el código de descuento que te prometimos',
    buttonText: 'Visitar tienda',
    url: '',
    date: undefined
  })
  const [date, setDate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [storeData, setStoreData] = useState<IStoreData>()
  const [clientTags, setClientTags] = useState<IClientTag[]>([])

  const router = useRouter()

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.API_URL}/store-data`)
    setStoreData(response.data[0])
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const getClientTags = async () => {
    const response = await axios.get(`${process.env.API_URL}/client-tag`)
    setClientTags(response.data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const submit = async () => {
    setLoading(true)
    await axios.post(`${process.env.API_URL}/new-campaign`, email)
    router.push('/marketing/campanas')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Nueva campaña</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={submit} className='bg-main text-white text-sm rounded-md w-36 h-8'>{loading ? <Spinner2 /> : 'Crear campaña'}</button>
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 mb-16 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Nueva campaña</h1>
          </div>
          <div className='flex flex-col gap-4 w-full max-w-1280 m-auto'>
            <div className='bg-white p-4 w-full rounded-md shadow-md dark:bg-neutral-800'>
              <div className='flex gap-12 mb-2'>
                <p className='text-sm mt-auto mb-auto'>Para:</p>
                <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setEmail({ ...email, address: e.target.value })} value={email.address} className='p-1.5 rounded border text-sm font-light focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                  <option>Todos los suscriptores</option>
                  {
                    clientTags.length
                      ? clientTags.map(clientTag => (
                        <option key={clientTag.tag}>{clientTag.tag}</option>
                      ))
                      : ''
                  }
                </select>
              </div>
              <div className='flex gap-[33px]'>
                <p className='text-sm mt-auto mb-auto'>Asunto:</p>
                <input type='text' placeholder='Asunto' onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail({...email, affair: e.target.value})} value={email.affair} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
            </div>
            <div className='w-full flex'>
              <div className='flex flex-wrap gap-6 m-auto'>
                <div className='w-[600px] flex flex-col gap-4 m-auto bg-white pt-6 pb-6 dark:bg-neutral-800'>
                  <img className='w-64 m-auto' src='https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png' />
                  <h1 className='m-auto text-3xl text-center'>{email.title}</h1>
                  <p className='m-auto text-center'>{email.paragraph}</p>
                  {
                    email.buttonText
                      ? <Link href={email.url} className='py-2 px-7 bg-main w-fit m-auto text-white'>{email.buttonText}</Link>
                      : ''
                  }
                  <div className='border-t pt-6 px-6 flex gap-4 justify-between dark:border-neutral-700'>
                    {
                      storeData
                        ? (
                          <>
                            <div className='flex flex-col gap-2'>
                              <p className='text-sm'>{storeData.name}</p>
                              <p className='text-sm'>{storeData.email}</p>
                              <p className='text-sm'>{storeData.phone}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                              <p className='text-sm text-right'>{storeData.address}</p>
                              <p className='text-sm text-right'>{storeData.city}, {storeData.region}</p>
                            </div>
                          </>
                        )
                        : ''
                    }
                  </div>
                </div>
                <div className='p-4 m-auto bg-white w-96 rounded-md shadow-md dark:bg-neutral-800'>
                  <h2 className='text-lg mb-4'>Contenido</h2>
                  <p className='mb-2 text-sm'>Titulo</p>
                  <input type='text' placeholder='Titulo' onChange={(e: any) => setEmail({...email, title: e.target.value})} value={email.title} className='font-light p-1.5 rounded mb-4 border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  <p className='mb-2 text-sm'>Parrafo</p>
                  <textarea placeholder='Parrafo' onChange={(e: any) => setEmail({...email, paragraph: e.target.value})} value={email.paragraph} className='font-light mb-4 p-1.5 rounded border text-sm w-full h-20 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  <p className='mb-2 text-sm'>Texto boton</p>
                  <input type='text' placeholder='Boton' onChange={(e: any) => setEmail({...email, buttonText: e.target.value})} value={email.buttonText} className='font-light mb-4 p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  <p className='mb-2 text-sm'>Link boton</p>
                  <input type='text' placeholder='Url' onChange={(e: any) => setEmail({...email, url: e.target.value})} value={email.url} className='font-light mb-4 p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  <p className='mb-2 text-sm'>Programar envio</p>
                  <div className='flex gap-2 mb-2'>
                    <input type='radio' name='send' onClick={() => setEmail({...email, date: undefined})} />
                    <p className='text-sm'>En este momento</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type='radio' name='send' onClick={() => setDate(true)} />
                    <p className='text-sm'>Fecha personalizada</p>
                  </div>
                  {
                    date
                      ? (
                        <div className='mt-2 flex gap-2'>
                          <input type='datetime-local' onChange={(e: any) => setEmail({...email, date: e.target.value})} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                      )
                      : ''
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default NewCampaign