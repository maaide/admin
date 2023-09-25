import { LeftMenu, Spinner2 } from '@/components/ui'
import { City, IStoreData, Region } from '@/interfaces'
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

const ShippingPage = () => {

  const [storeData, setStoreData] = useState<IStoreData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    region: '',
    city: '',
    logo: { public_id: '', url: '' },
    logoWhite: { public_id: '', url: '' }
  })
  const [regions, setRegions] = useState<Region[]>()
  const [citys, setCitys] = useState<City[]>()
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getStoreData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
    if (response.data) {
      setStoreData(response.data)
    }
  }

  useEffect(() => {
    getStoreData()
  }, [])

  const inputChange = (e: any) => {
    setStoreData({...storeData, [e.target.name]: e.target.value})
  }

  const requestRegions = async () => {
    const request = await axios.get('https://testservices.wschilexpress.com/georeference/api/v1.0/regions', {
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
      }
    })
    setRegions(request.data.regions)
  }

  useEffect(() => {
    requestRegions()
  }, [])

  const imageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const response = await axios.post('https://server-production-e234.up.railway.app/product-image-upload', {image: e.target.files[0]}, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': 'multipart/form-data'
        }
      })
      setStoreData({...storeData, logo: response.data.image.url})
    }
  }

  const imageChange2 = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, {image: e.target.files[0]}, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': 'multipart/form-data'
        }
      })
      setStoreData({...storeData, logoWhite: response.data.image.url})
    }
  }

  const regionChange = async (e: any) => {
    const region = regions?.find(region => region.regionName === e.target.value)
    const request = await axios.get(`https://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${region?.regionId}&type=0`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
      }
    })
    setCitys(request.data.coverageAreas)
    setStoreData({...storeData, region: e.target.value})
  }

  const cityChange = async (e: any) => {
    setStoreData({...storeData, city: e.target.value})
  }

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, storeData)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Envíos</title>
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
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 70px)', overflow: 'overlay' }}>
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
            <div className='w-3/4'>
              <h2 className='text-lg mt-3 pb-3 mb-4 border-b dark:border-neutral-700'>Envíos</h2>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default ShippingPage