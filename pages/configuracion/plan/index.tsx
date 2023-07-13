import { LeftMenu, Spinner2 } from '@/components/ui'
import { City, IStoreData, Region } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'

const Configuration = () => {

  const [plan, setPlan] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.API_URL}/plan`, plan)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Plan</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex w-full max-w-1280 m-auto gap-8 mb-4'>
            <div className='bg-white w-1/4 h-fit shadow-md p-4 rounded-md dark:bg-neutral-800'>
              <div className='mb-4'>
                <h1 className='text-lg pb-2 border-b dark:border-neutral-700'>Configuración</h1>
              </div>
              <div className='flex flex-col gap-2'>
                <Link href='/configuracion'>Información de la tienda</Link>
                <Link href='/configuracion/pasarela-de-pago'>Pasarela de pago</Link>
                <Link href='/configuracion/plan'>Plan</Link>
                <Link href='/configuracion/politicas'>Politicas</Link>
                <Link href='/configuracion/dominio'>Dominio</Link>
                <Link href='/configuracion/envios'>Envíos</Link>
                <Link href='/configuracion/mensajes'>Mensajes</Link>
              </div>
            </div>
            <div className='w-3/4 flex flex-col gap-4'>
              <h2 className='text-lg mt-3 pb-3 border-b dark:border-neutral-700'>Plan</h2>
              <p>Cambia tu plan en cualquier momento, los cambios pueden demorar hasta 24 horas habiles.</p>
              <div className='w-full flex flex-col gap-4 p-5 bg-white rounded-lg shadow-lg dark:bg-neutral-800'>
                <div className='flex gap-2 justify-between border-b pb-4 dark:border-neutral-700'>
                  <div className='flex flex-col gap-2'>
                    <h3>Plan Starter</h3>
                    <p className='text-sm'>Funciones principales necesarias para vender online</p>
                  </div>
                  <p className='my-auto text-2xl'>$9.990</p>
                </div>
                <div className='flex gap-4 justify-between border-b pb-4 dark:border-neutral-700'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                      <svg className='w-5' fill="#17de38" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 305.002 305.002" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5 S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5 c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"></path> <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678 l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385 c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"></path> </g> </g> </g></svg>
                      <p className='text-sm'>Integración metodos de pagos y envíos</p>
                    </div>
                    <div className='flex gap-2'>
                      <svg className='w-5' fill="#17de38" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 305.002 305.002" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5 S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5 c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"></path> <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678 l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385 c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"></path> </g> </g> </g></svg>
                      <p className='text-sm'>3 temas disponibles</p>
                    </div>
                    <div className='flex gap-2'>
                      <svg className='w-5' fill="#17de38" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 305.002 305.002" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5 S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5 c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"></path> <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678 l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385 c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"></path> </g> </g> </g></svg>
                      <p className='text-sm'>Ofertas productos</p>
                    </div>
                    <div className='flex gap-2'>
                      <svg className='w-5' fill="#17de38" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 305.002 305.002" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5 S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5 c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"></path> <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678 l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385 c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"></path> </g> </g> </g></svg>
                      <p className='text-sm'>Pago contraentrega</p>
                    </div>
                  </div>
                  <button className='h-fit text-sm'>Ver todas las caracteristicas</button>
                </div>
                <div className='flex gap-4 justify-between border-b pb-4 dark:border-neutral-700'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-[15px]'>Facturación</p>
                    <p className='text-sm'>Facturación mensual: Siguiente pago 18 de Marzo del 2024</p>
                  </div>
                  <button className='h-fit text-sm'>Cambiar facturación</button>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-[15px]'>Forma de pago</p>
                  <div className='flex gap-2'>
                    <p className='text-sm'>Tarjeta terminada en 1254</p>
                  </div>
                </div>
              </div>
              <button className='mt-4 pt-1.5 pb-1.5 h-fit pl-7 pr-7 w-fit m-auto rounded-md bg-main text-white'>Cambiar plan</button>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default Configuration