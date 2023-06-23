import { LeftMenu, Spinner2 } from '@/components/ui'
import { IAutomatization, IClientTag } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const NewAutomatization = () => {

  const [automatization, setAutomatization] = useState<IAutomatization>({
    address: 'Todos los suscriptores',
    name: '',
    automatization: [{
      affair: '',
      title: '',
      paragraph: '',
      buttonText: '',
      url: '',
      number: 0,
      time: ''
    }]
  })
  const [clientTags, setClientTags] = useState<IClientTag[]>([])
  const [loading, setLoading] = useState(false)

  const getClientTags = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/client-tag')
    setClientTags(response.data)
  }

  useEffect(() => {
    getClientTags()
  }, [])

  return (
    <>
      <Head>
        <title>Nueva automatización</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
          <div className='flex m-auto w-1280 justify-between'>
            <div className='flex gap-2'>
              <p className='my-auto'>Nombre de la automatización:</p>
              <input onChange={(e: any) => setAutomatization({ ...automatization, name: e.target.value })} value={automatization.name} type='text' placeholder='Nombre' className='font-light p-1.5 rounded border text-sm w-96 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
            </div>
            <div className='flex gap-2 w-fit'>
              <button className='bg-main text-white m-auto text-sm rounded-md w-48 h-8'>{loading ? <Spinner2 /> : 'Crear automatización'}</button>
              <Link className='bg-red-600 h-8 flex m-auto text-white text-sm rounded-md pl-4 pr-4' href='/productos'><p className='m-auto'>Descartar</p></Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] mb-16 dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='w-full max-w-1280 m-auto mb-6'>
            <h1 className='text-xl mb-4'>Nueva automatización</h1>
          </div>
          <div className='w-full flex flex-col max-w-1280 m-auto mb-4'>
            <div className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md'>
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
              automatization.automatization.map((email, index) => (
                <>
                  <div className='h-[40px] w-[2px] bg-neutral-300 m-auto' />
                  <div className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md'>
                    <p>Tiempo de espera</p>
                    <div className='flex gap-2'>
                      <input onChange={(e: any) => {
                        const data = automatization.automatization
                        data[index].number = e.target.value
                        setAutomatization({ ...automatization, automatization: data })
                      }} value={automatization.automatization[index].number} type='text' placeholder='Tiempo' className='font-light p-1.5 rounded border text-sm w-44 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      <select onChange={(e: any) => {
                        const data = automatization.automatization
                        data[index].time = e.target.value
                        setAutomatization({ ...automatization, automatization: data })
                      }} value={automatization.automatization[index].time} className='p-1.5 rounded border text-sm font-light focus:outline-none w-44 focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                        <option>Días</option>
                        <option>Horas</option>
                        <option>Minutos</option>
                      </select>
                    </div>
                  </div>
                  <div className='h-[40px] w-[2px] bg-neutral-300 m-auto' />
                  <div key={email.affair} className='w-[500px] p-4 flex flex-col gap-2 bg-white m-auto rounded-md shadow-md'>
                    <p>Enviar correo</p>
                    <button className='w-fit py-2 px-4 rounded bg-main text-white'>Editar Correo</button>
                  </div>
                </>
              ))
            }
            <button onClick={(e: any) => {
              e.preventDefault()
              setAutomatization({ ...automatization, automatization: automatization.automatization.concat({
                affair: '',
                title: '',
                paragraph: '',
                buttonText: '',
                url: '',
                number: 0,
                time: ''
              }) })
            }} className='mt-6 bg-main text-white text-sm rounded-md w-36 m-auto h-8'>Agregar paso</button>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default NewAutomatization