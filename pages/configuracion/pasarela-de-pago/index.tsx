import { LeftMenu, Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'

const PaymentGatewayPage = () => {

  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState({
    transbank: {
      active: false,
      commerceCode: '',
      apiKey: ''
    },
    mercadoPago: {
      active: false,
      accessToken: '',
      publicKey: ''
    }
  })

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment-gateway`, payment)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Pasarela de pago</title>
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
              </div>
            </div>
            <div className='w-3/4'>
              <h2 className='text-lg mt-3 pb-3 mb-4 border-b dark:border-neutral-700'>Pasarela de pago</h2>
              <div className='flex flex-col gap-2'>
                <p>Selecciona los metodos de pago para tu tienda</p>
                <div className='flex gap-2'>
                  <input type='checkbox' onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.checked ? setPayment({ ...payment, transbank: { ...payment.transbank, active: true } }) : setPayment({ ...payment, transbank: { ...payment.transbank, active: false } }) } />
                  <p>Transbank - WebPay Plus</p>
                </div>
                {
                  payment.transbank.active
                    ? (
                      <div className='flex flex-col gap-2'>
                        <div>
                          <p>Codigo del comercio</p>
                          <input type='text' onChange={ (e: ChangeEvent<HTMLInputElement>) => setPayment({ ...payment, transbank: { ...payment.transbank, commerceCode: e.target.value } }) } value={payment.transbank.commerceCode} placeholder='Codigo del comercio' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                        <div>
                          <p>Api Key</p>
                          <input type='text' onChange={ (e: ChangeEvent<HTMLInputElement>) => setPayment({ ...payment, transbank: { ...payment.transbank, apiKey: e.target.value } }) } value={payment.transbank.apiKey} placeholder='Api Key' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                      </div>
                    )
                    : ''
                }
                <div className='flex gap-2'>
                  <input type='checkbox' onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.checked ? setPayment({ ...payment, mercadoPago: { ...payment.mercadoPago, active: true } }) : setPayment({ ...payment, mercadoPago: { ...payment.mercadoPago, active: false } })} />
                  <p>MercadoPago</p>
                </div>
                {
                  payment.mercadoPago.active
                    ? (
                      <div className='flex flex-col gap-2'>
                        <div>
                          <p>Token de acceso</p>
                          <input type='text' onChange={ (e: ChangeEvent<HTMLInputElement>) => setPayment({ ...payment, mercadoPago: { ...payment.mercadoPago, accessToken: e.target.value } }) } value={payment.mercadoPago.accessToken} placeholder='Token de acceso' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                        <div>
                          <p>Public key</p>
                          <input type='text' onChange={ (e: ChangeEvent<HTMLInputElement>) => setPayment({ ...payment, mercadoPago: { ...payment.mercadoPago, publicKey: e.target.value } }) } value={payment.mercadoPago.publicKey} placeholder='Public key' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                      </div>
                    )
                    : ''
                }
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default PaymentGatewayPage