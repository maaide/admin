import { LeftMenu, Spinner, Spinner2 } from '@/components/ui'
import { IAutomatization, IClientTag, IEmailAutomatization, IStoreData } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'

const NewAutomatization = () => {

  const [automatization, setAutomatization] = useState<Partial<IAutomatization>>()
  const [clientTags, setClientTags] = useState<IClientTag[]>([])
  const [loading, setLoading] = useState(false)
  const [tempEmail, setTempEmail] = useState({
    affair: '',
    buttonText: '',
    paragraph: '',
    title: '',
    url: '',
    index: 0
  })
  const [storeData, setStoreData] = useState<IStoreData>()

  const router = useRouter()

  const getAutomatization = async () => {
    const slug = router.asPath.replace('/marketing/automatizaciones/', '')
    const response = await axios.get(`${process.env.API_URL}/automatization/${slug}`)
    setAutomatization(response.data)
  }

  useEffect(() => {
    getAutomatization()
  }, [])

  const getClientTags = async () => {
    const response = await axios.get(`${process.env.API_URL}/client-tag`)
    setClientTags(response.data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.API_URL}/store-data`)
    setStoreData(response.data[0])
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const editEmail = (email: IEmailAutomatization, index: any, e: any) => {
    e.preventDefault()
    setTempEmail({ affair: email.affair, buttonText: email.buttonText, index: index, paragraph: email.paragraph, title: email.title, url: email.url })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.post(`${process.env.API_URL}/automatization`, { address: automatization?.address, name: automatization?.name, date: new Date(), automatization: automatization?.automatization })
    router.push('/marketing/automatizaciones')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Nueva automatización</title>
      </Head>
      <LeftMenu>
        {
          automatization
            ? (
              <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
                <div className='flex m-auto w-1280 justify-between'>
                  <div className='flex gap-2'>
                    <p className='my-auto'>Nombre de la automatización:</p>
                    <input onChange={(e: any) => setAutomatization({ ...automatization, name: e.target.value })} value={automatization.name} type='text' placeholder='Nombre' className='font-light p-1.5 rounded border text-sm w-96 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                  <div className='flex gap-2 w-fit'>
                    <button onClick={handleSubmit} className='bg-main text-white m-auto text-sm rounded-md w-48 h-8'>{loading ? <Spinner2 /> : 'Editar automatización'}</button>
                    <Link className='bg-red-600 h-8 flex m-auto text-white text-sm rounded-md pl-4 pr-4' href='/productos'><p className='m-auto'>Descartar</p></Link>
                  </div>
                </div>
              </div>
            )
            : (
              <div className='fixed flex bg-[#f6f6f7] bottom-0 right-0 h-full dark:bg-neutral-900' style={{ width: 'calc(100% - 256px)' }}>

              </div>
            )
        }
        <div className='p-6 bg-[#f6f6f7] mb-16 dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          {
            automatization
              ? (
                <>
                  <div className='w-full max-w-1280 m-auto mb-6'>
                    <h1 className='text-xl mb-4'>Automatización: {automatization?._id}</h1>
                  </div>
                  <div className='w-full flex max-w-1280 m-auto'>
                    <div className='m-auto flex gap-8'>
                      <div className='flex flex-col mb-4 h-fit'>
                        <div className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md dark:bg-neutral-800'>
                          <p>Selecciona el segmento de usuarios para la automatización</p>
                          <select className='p-1.5 rounded border text-sm font-light focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
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
                        {
                          automatization.automatization?.map((email, index) => (
                            <>
                              <div className='h-[40px] w-[2px] bg-neutral-300 m-auto dark:bg-neutral-700' />
                              <div className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md dark:bg-neutral-800'>
                                <p>Tiempo de espera</p>
                                <div className='flex gap-2'>
                                  <input onChange={(e: any) => {
                                    const data = automatization.automatization!
                                    data[index].number = e.target.value
                                    setAutomatization({ ...automatization, automatization: data })
                                  }} value={email.number} type='text' placeholder='Tiempo' className='font-light p-1.5 rounded border text-sm w-44 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                  <select onChange={(e: any) => {
                                    const data = automatization.automatization!
                                    data[index].time = e.target.value
                                    setAutomatization({ ...automatization, automatization: data })
                                  }} value={email.time} className='p-1.5 rounded border text-sm font-light focus:outline-none w-44 focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                                    <option>Días</option>
                                    <option>Horas</option>
                                    <option>Minutos</option>
                                  </select>
                                </div>
                              </div>
                              <div className='h-[40px] w-[2px] bg-neutral-300 m-auto dark:bg-neutral-700' />
                              <div key={email.affair} className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md dark:bg-neutral-800'>
                                <p>Enviar correo</p>
                                <p className='text-sm'>Asunto: {email.affair}</p>
                                <button onClick={(e: any) => editEmail(email, index, e)} className='bg-main text-white text-sm rounded-md w-36 h-8'>Editar Correo</button>
                              </div>
                            </>
                          ))
                        }
                        <button onClick={(e: any) => {
                          e.preventDefault()
                          setAutomatization({ ...automatization, automatization: automatization.automatization?.concat({
                            affair: '',
                            title: 'Te damos la bienvenida a nuestra tienda',
                            paragraph: '¡Hola ${name}! Nos hace muy felices tenerte con nosotros, aquí te dejamos el código de descuento que te prometimos',
                            buttonText: 'Visitar tienda',
                            url: '',
                            number: 0,
                            time: 'Días'
                          }) })
                        }} className='mt-6 bg-main text-white text-sm rounded-md w-36 m-auto h-8'>Agregar paso</button>
                      </div>
                      {
                        (tempEmail.buttonText !== '' || tempEmail.paragraph !== '' || tempEmail.title !== '')
                          ? (
                            <div className='flex flex-col gap-6'>
                              <div className='w-[600px] p-4 flex flex-col gap-2 bg-white rounded-md shadow-md dark:bg-neutral-800'>
                                <h2>Configuración correo</h2>
                                <div className='flex'>
                                  <p className='text-sm mt-auto mb-auto w-32'>Asunto:</p>
                                  <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, affair: e.target.value })} value={tempEmail.affair} type='text' placeholder='Asunto' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                </div>
                                <div className='flex'>
                                  <p className='text-sm mt-auto mb-auto w-32'>Titulo:</p>
                                  <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, title: e.target.value })} value={tempEmail.title} type='text' placeholder='Titulo' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                </div>
                                <div className='flex'>
                                  <p className='text-sm mt-auto mb-auto w-32'>Parrafo:</p>
                                  <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTempEmail({ ...tempEmail, paragraph: e.target.value })} value={tempEmail.paragraph} placeholder='Parrafo' className='font-light h-16 p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                </div>
                                <div className='flex'>
                                  <p className='text-sm mt-auto mb-auto w-32'>Texto boton:</p>
                                  <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, buttonText: e.target.value })} value={tempEmail.buttonText} type='text' placeholder='Boton' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                </div>
                                <div className='flex'>
                                  <p className='text-sm mt-auto mb-auto w-32'>Url:</p>
                                  <input onChange={(e: ChangeEvent<HTMLInputElement>) => setTempEmail({ ...tempEmail, url: e.target.value })} value={tempEmail.url} type='text' placeholder='Url' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                </div>
                                <button onClick={(e: any) => {
                                  e.preventDefault()
                                  const data = automatization.automatization!
                                  data[tempEmail.index] = { ...data[tempEmail.index], affair: tempEmail.affair, buttonText: tempEmail.buttonText, paragraph: tempEmail.paragraph, title: tempEmail.title, url: tempEmail.url }
                                  setAutomatization({ ...automatization, automatization: data })
                                  setTempEmail({
                                    affair: '',
                                    buttonText: '',
                                    paragraph: '',
                                    title: '',
                                    url: '',
                                    index: 0
                                  })
                                }} className='bg-main text-white text-sm rounded-md w-36 mt-2 h-8'>Guardar</button>
                              </div>
                              <div className='flex flex-col h-fit gap-4 p-4 bg-white w-[600px] dark:bg-neutral-800'>
                                <img className='w-64 mx-auto' src='https://res.cloudinary.com/blasspod/image/upload/v1664841659/blaspod/ouxxwsmqodpemvffqs7b.png' />
                                <h1 className='text-center mx-auto text-3xl'>{tempEmail.title}</h1>
                                <p className='text-center mx-auto'>{tempEmail.paragraph}</p>
                                {
                                  tempEmail.buttonText !== ''
                                    ? <Link className='py-2 px-7 bg-main w-fit m-auto text-white' href={tempEmail.url}>{tempEmail.buttonText}</Link>
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
                            </div>
                          )
                          : ''
                      }
                    </div>
                  </div>
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

export default NewAutomatization