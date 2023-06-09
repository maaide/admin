import { LeftMenu, Spinner2 } from '@/components/ui'
import { City, IStoreData, Region } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'

const Configuration = () => {

  const [storeData, setStoreData] = useState<IStoreData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    region: '',
    city: '',
    logo: '',
    logoWhite: ''
  })
  const [regions, setRegions] = useState<Region[]>()
  const [citys, setCitys] = useState<City[]>()
  const [loading, setLoading] = useState(false)

  const getStoreData = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/store-data')
    setStoreData(response.data)
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
      const response = await axios.post('https://server-production-e234.up.railway.app/product-image-upload', {image: e.target.files[0]}, {
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
    await axios.post('https://server-production-e234.up.railway.app/store-data', storeData)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Configuración</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
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
                <Link href='/configuracion/mensajes'>Mensajes</Link>
              </div>
            </div>
            <div className='w-3/4'>
              <h2 className='text-lg mt-3 pb-3 mb-4 border-b dark:border-neutral-700'>Información de la tienda</h2>
              <div className='bg-white border mb-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h3 className='mb-4'>Información general</h3>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Nombre de la tienda</p>
                  <input type='text' name='name' value={storeData.name} onChange={inputChange} placeholder='Nombre de la tienda' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Correo de la tienda</p>
                  <input type='text' name='email' value={storeData.email} onChange={inputChange} placeholder='Correo de la tienda' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Telefono de la tienda</p>
                  <div className='flex gap-2'>
                    <p className='text-sm mt-auto mb-auto'>+56</p>
                    <input type='text' name='phone' value={storeData.phone} onChange={inputChange} placeholder='Telefono de la tienda' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Logo de la tienda</p>
                  <input onChange={imageChange} type='file' className='text-sm' />
                </div>
                <div>
                  <p className='text-sm mb-2'>Logo blanco de la tienda</p>
                  <input onChange={imageChange2} type='file' className='text-sm' />
                </div>
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h3 className='mb-4'>Ubicación de la tienda</h3>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Dirección</p>
                  <input type='text' name='address' value={storeData.address} onChange={inputChange} placeholder='Dirección' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Departamento, local, etc. (opcional)</p>
                  <input type='text' name='departament' value={storeData.departament} onChange={inputChange} placeholder='Dirección' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex gap-2'>
                  <select className='font-light p-1.5 rounded border text-sm w-1/2 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' onChange={regionChange}>
                    <option>Seleccionar Región</option>
                    {
                    regions !== undefined
                      ? regions.map(region => <option key={region.regionId}>{region.regionName}</option>)
                      : ''
                    }
                  </select>
                  <select className='font-light p-1.5 w-1/2 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' onChange={cityChange}>
                    <option>Seleccionar Ciudad</option>
                    {citys?.map(city => <option key={city.countyCode}>{city.countyName}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default Configuration