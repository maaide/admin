import { LeftMenu, Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AiOutlineLaptop, AiOutlineFileDone } from 'react-icons/ai'
import { BsCreditCard } from 'react-icons/bs'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { TbWorldWww } from 'react-icons/tb'

const PoliticsPage = () => {

  const [politics, setPolitics] = useState({
    terms: '',
    shipping: '',
    privacy: '',
    devolutions: ''
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getPolitics = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/politics`)
    if (response.data) {
      setPolitics(response.data)
    }
  }

  useEffect(() => {
    getPolitics()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPolitics({ ...politics, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/politics`, politics)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Politicas de la tienda</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-40 h-8'>{loading ? <Spinner2 /> : 'Guardar datos'}</button>
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900 mb-16' style={{ width: 'calc(100% - 70px)', overflow: 'overlay' }}>
          <div className='flex w-full max-w-1280 m-auto gap-8 mb-4'>
            <div className='bg-white sticky top-0 w-1/4 h-fit shadow-md p-4 rounded-md dark:bg-neutral-800'>
              <div className='mb-4'>
                <h1 className='text-lg pb-2'>Configuración</h1>
              </div>
              <div className='flex flex-col gap-2'>
                <Link className={`flex gap-2 ${router.asPath === '/configuracion' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion'><HiOutlineInformationCircle className='my-auto text-main text-xl' />Información de la tienda</Link>
                <Link className={`flex gap-2 ${router.asPath === '/configuracion/pasarela-de-pago' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/pasarela-de-pago'><BsCreditCard className='my-auto text-main text-xl' />Pasarela de pago</Link>
                <Link className={`flex gap-2 ${router.asPath === '/configuracion/plan' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/plan'><AiOutlineLaptop className='my-auto text-main text-xl' />Plan</Link>
                <Link className={`flex gap-2 ${router.asPath === '/configuracion/politicas' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/politicas'><AiOutlineFileDone className='my-auto text-main text-xl' />Politicas</Link>
                <Link className={`flex gap-2 ${router.asPath === '/configuracion/dominio' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/dominio'><TbWorldWww className='my-auto text-main text-xl' />Dominio</Link>
                <Link className={`flex gap-2 ${router.asPath === '/configuracion/envios' ? 'bg-main/10' : ''} p-1 rounded transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700`} href='/configuracion/envios'><LiaShippingFastSolid className='my-auto text-main text-xl' />Envíos</Link>
              </div>
            </div>
            <div className='w-3/4 flex flex-col gap-4'>
              <h2 className='text-lg mt-3 pb-3 border-b dark:border-neutral-700'>Politicas de la tienda</h2>
              <div className='flex flex-col gap-2'>
                <h3>Terminos y condiciones</h3>
                <textarea onChange={handleChange} name='terms' value={politics.terms} placeholder='Terminos y Condiciones' className='w-full mb-1 p-1.5 border rounded text-sm font-light h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3>Politicas de envíos</h3>
                <textarea onChange={handleChange} name='shipping' value={politics.shipping} placeholder='Politicas de envíos' className='w-full mb-1 p-1.5 border rounded text-sm font-light h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3>Politicas de privacidad</h3>
                <textarea onChange={handleChange} name='privacy' value={politics.privacy} placeholder='Politicas de privacidad' className='w-full mb-1 p-1.5 border rounded text-sm font-light h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3>Politicas de devoluciones y reembolsos</h3>
                <textarea onChange={handleChange} name='devolutions' value={politics.devolutions} placeholder='Politicas de devoluciones' className='w-full mb-1 p-1.5 border rounded text-sm font-light h-64 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default PoliticsPage