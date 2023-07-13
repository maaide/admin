import { LeftMenu, Spinner, Spinner2 } from '@/components/ui'
import { IPromotionalCode } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

const PromotionalCodePage = () => {

  const [codeInfo, setCodeInfo] = useState<Partial<IPromotionalCode>>()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [minimunPrice, setMinimunPrice] = useState(false)

  const router = useRouter()

  const getPromotionalCode = async () => {
    const slug = router.asPath.replace('/productos/codigos-promocionales/', '')
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code/${slug}`)
    setCodeInfo(data)
    if (data.minimumAmount !== 0) {
      setMinimunPrice(true)
    }
  }

  useEffect(() => {
    getPromotionalCode()
  }, [])

  const inputChange = (e: any) => {
    setCodeInfo({...codeInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    setSubmitLoading(true)
    const slug = router.asPath.replace('/productos/codigos-promocionales/', '')
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/promotional-code/${slug}`, codeInfo)
    router.push('/productos/codigos-promocionales')
    setSubmitLoading(false)
  }

  return (
    <>
      <Head>
        <title>{codeInfo?.promotionalCode}</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-36 h-8'>{submitLoading ? <Spinner2 /> : 'Modificar codigo'}</button>
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos/codigos-promocionales'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          {
            codeInfo
              ? (
                <>
                  <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
                    <Link href='/productos/codigos-promocionales' className='border rounded p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-xl mt-auto mb-auto'>{codeInfo.promotionalCode}</h1>
                  </div>
                  <form className='flex gap-4 max-w-1280 m-auto'>
                    <div className='flex gap-4 flex-col w-2/3'>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4'>Codigo promocional</h2>
                        <input type='text' placeholder='Codigo promocional' name='promotionalCode' onChange={inputChange} value={codeInfo.promotionalCode} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4'>Promoción</h2>
                        <div className='flex gap-2 border-b pb-4 dark:border-neutral-700'>
                          <div className='w-1/2'>
                            <h3 className='text-sm mb-2'>Tipo de descuento</h3>
                            <select value={codeInfo.discountType} onChange={inputChange} name='discountType' className='p-1.5 rounded border text-sm font-light focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                              <option>Porcentaje</option>
                              <option>Valor</option>
                            </select>
                          </div>
                          <div className='w-1/2'>
                            <h3 className='text-sm mb-2'>Valor del descuento</h3>
                            <input type='text' placeholder='Valor' name='value' onChange={inputChange} value={codeInfo.value} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                        </div>
                        <div className='mt-4'>
                          <div className='flex gap-2'>
                            <input type='checkbox' checked={minimunPrice} onChange={(e: any) => e.target.checked ? setMinimunPrice(true) : setMinimunPrice(false)} />
                            <h3 className='text-sm'>Este cupon requiere de un monto minimo</h3>
                          </div>
                          {
                            minimunPrice
                              ? (
                                <div className='mt-2'>
                                  <h3 className='text-sm mb-2'>Monto minimo</h3>
                                  <input type='text' placeholder='Valor' name='minimumAmount' onChange={inputChange} value={codeInfo.minimumAmount} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                </div>
                              )
                              : ''
                          }
                        </div>
                      </div>
                    </div>
                    <div className='w-1/3 flex flex-col gap-4'>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4'>Estado del cupon</h2>
                        <select value={codeInfo.state ? 'Activo' : 'Desactivado'} onChange={(e: any) => setCodeInfo({...codeInfo, state: e.target.value === 'Activo' ? true : false})} className='p-1.5 rounded border text-sm font-light focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                          <option>Activo</option>
                          <option>Desactivado</option>
                        </select>
                      </div>
                      <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4'>Eliminar cupon</h2>
                        <button className='bg-red-600 text-white pt-1.5 pb-1.5 w-24 rounded-md'>Eliminar</button>
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

export default PromotionalCodePage