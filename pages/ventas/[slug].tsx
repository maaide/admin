import { LeftMenu, Spinner2 } from '@/components/ui'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ISell } from '../../interfaces'
import { NumberFormat } from '@/utils'

const SellPage = () => {

  const [sell, setSell] = useState<ISell>({
    address: '',
    cart: [],
    city: '',
    email: '',
    firstName: '',
    pay: '',
    region: '',
    shipping: 0,
    state: '',
    total: 0,
    shippingMethod: '',
    shippingState: ''
  })
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [loadingEditPay, setLoadingEditPay] = useState(false)
  const [shippingCode, setShippingCode] = useState('')

  const router = useRouter()

  const getSell = async () => {
    const slug = router.asPath.replace('/ventas/', '')
    const response = await axios.get(`https://server-production-e234.up.railway.app/sells/${slug}`)
    setSell(response.data)
  }

  useEffect(() => {
    getSell()
  }, [])

  return (
    <>
      <Head>
        <title>Venta: {sell._id}</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
            <Link href='/ventas' className='border rounded p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl mt-auto mb-auto'>Venta id: {sell._id}</h1>
          </div>
          <div className='flex gap-4 max-w-1280 m-auto'>
            <div className='flex gap-4 flex-col w-3/5'>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Productos</h2>
                {
                  sell.cart?.map(product => (
                    <div className='flex gap-2 justify-between mb-2' key={product._id}>
                      <div className='flex gap-2'>
                        <div className='flex gap-2'>
                          <img className='w-28' src={product.image} alt={product.name} />
                        </div>
                        <div className='mt-auto mb-auto'>
                          <p className='text-sm'>{product.name}</p>
                          <p className='font-light text-sm'>Cantidad: {product.quantity}</p>
                        </div>
                      </div>
                      <div className='mt-auto mb-auto'>
                        <p className='text-sm font-light'>${NumberFormat(product.price * product.quantity)}</p>
                      </div>
                    </div>
                  ))
                }
                <div className='flex gap-2 justify-between mb-2'>
                  <p className='font-light text-sm'>Subtotal</p>
                  <p className='font-light text-sm'>${NumberFormat(sell.cart?.reduce((prev, curr) => prev + curr.price * curr.quantity, 0))}</p>
                </div>
                <div className='flex gap-2 justify-between mb-2'>
                  <p className='font-light text-sm'>Envío</p>
                  <p className='text-sm font-light'>${NumberFormat(sell.shipping)}</p>
                </div>
                <div className='flex gap-2 justify-between'>
                  <p className='font-light'>Total</p>
                  <p>${NumberFormat(sell.total)}</p>
                </div>
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Pago</h2>
                <p className='text-sm font-light mb-2'>Estado del pago: {sell.state}</p>
                <p className='text-sm font-light'>Metodo de pago: {sell.pay}</p>
                {
                  sell.pay === 'Pago en la entrega'
                    ? sell.state === 'No pagado'
                      ? (
                        <button onClick={async (e: any) => {
                          e.preventDefault()
                          setLoadingEditPay(true)
                          const updatedSell = {...sell, state: 'Pago realizado'}
                          await axios.put(`https://server-production-e234.up.railway.app/sells/${sell._id}`, {sell: updatedSell})
                          await getSell()
                          setLoadingEditPay(false)
                        }} className='bg-main mt-2 h-9 text-white text-sm rounded-md w-48'>{loadingEditPay ? <Spinner2 /> : 'Marcar pago realizado'}</button>
                      )
                      : ''
                    : ''
                }
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Entrega</h2>
                <p className='text-sm font-light mb-2'>Estado del envío: {sell.shippingState}</p>
                <p className='text-sm font-light'>Metodo del envío: {sell.shippingMethod}</p>
                {
                  sell.shippingState === 'No empaquetado'
                    ? (
                      <button onClick={async (e: any) => {
                        e.preventDefault()
                        setLoadingEdit(true)
                        const updatedSell = {...sell, shippingState: 'Productos empaquetados'}
                        await axios.put(`https://server-production-e234.up.railway.app/sells/${sell._id}`, {sell: updatedSell})
                        await getSell()
                        setLoadingEdit(false)
                      }} className='bg-main mt-2 h-9 text-white text-sm rounded-md w-60'>{loadingEdit ? <Spinner2 /> : 'Marcar como empaquetado'}</button>
                    )
                    : ''
                }
                {
                  sell.shippingState === 'Productos empaquetados'
                    ? sell.shippingMethod === 'ENVIO EXPRESS'
                      ? (
                        <button onClick={async (e: any) => {
                          e.preventDefault()
                          setLoadingEdit(true)
                          const updatedSell = {...sell, shippingState: 'Envío realizado'}
                          await axios.put(`https://server-production-e234.up.railway.app/sells/${sell._id}`, {sell: updatedSell})
                          await getSell()
                          setLoadingEdit(false)
                        }} className='bg-main mt-2 h-9 text-white text-sm rounded-md w-52'>{loadingEdit ? <Spinner2 /> : 'Marcar como enviado'}</button>
                      )
                      : (
                        <div className='mt-2'>
                          <p className='mb-2 font-light text-sm'>Codigo de seguimiento</p>
                          <input type='text' placeholder='Codigo' onChange={(e: any) => setShippingCode(e.target.value)} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          {
                            shippingCode !== ''
                              ? (
                                <button onClick={async (e: any) => {
                                  e.preventDefault()
                                  setLoadingEdit(true)
                                  const updatedSell = {...sell, shippingState: 'Envío realizado'}
                                  await axios.put(`https://server-production-e234.up.railway.app/sells/${sell._id}`, {sell: updatedSell, shippingCode: shippingCode})
                                  await getSell()
                                  setLoadingEdit(false)
                                }} className='bg-main mt-2 h-9 text-white text-sm rounded-md w-52'>{loadingEdit ? <Spinner2 /> : 'Marcar como enviado'}</button>
                              )
                              : (
                                <button onClick={async (e: any) => e.preventDefault()} className='bg-main/50 mt-2 h-9 text-white text-sm rounded-md w-52 cursor-not-allowed'>{loadingEdit ? <Spinner2 /> : 'Marcar como enviado'}</button>
                              )
                          }
                        </div>
                      )
                    : ''
                }
              </div>
            </div>
            <div className='flex gap-4 flex-col w-2/5'>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Datos del cliente</h2>
                <Link className='font-light text-sm block mb-2' href={`/clientes/${sell.email}`}>{sell.firstName} {sell.lastName}</Link>
                <Link className='font-light text-sm block' href={`/clientes/${sell.email}`}>{sell.email}</Link>
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Dirección de envío</h2>
                <p className='text-sm font-light mb-2'>{sell.address}</p>
                <p className='text-sm font-light mb-2'>{sell.city}</p>
                <p className='text-sm font-light'>{sell.region}</p>
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Cancelar venta</h2>
                <button onClick={async () => {
                  const sellUpdate = {...sell, state: 'Cancelado'}
                  await axios.put(`https://server-production-e234.up.railway.app/sells/${sell._id}`, {sell: sellUpdate})
                  router.push('/ventas')
                }} className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md w-24'>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default SellPage