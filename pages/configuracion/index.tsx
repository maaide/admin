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
    schedule: {
      monday: {
        state: false,
        open: '',
        close: ''
      },
      tuesday: {
        state: false,
        open: '',
        close: ''
      },
      wednesday: {
        state: false,
        open: '',
        close: ''
      },
      thursday: {
        state: false,
        open: '',
        close: ''
      },
      friday: {
        state: false,
        open: '',
        close: ''
      },
      saturday: {
        state: false,
        open: '',
        close: ''
      },
      sunday: {
        state: false,
        open: '',
        close: ''
      }
    },
    logo: { public_id: '', url: '' },
    logoWhite: { public_id: '', url: '' },
    instagram: '',
    facebook: '',
    tiktok: '',
    whatsapp: ''
  })
  const [regions, setRegions] = useState<Region[]>()
  const [citys, setCitys] = useState<City[]>()
  const [loading, setLoading] = useState(false)

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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, {image: e.target.files[0]}, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': 'multipart/form-data'
        }
      })
      setStoreData({...storeData, logo: { public_id: response.data.image.public_id, url: response.data.image.url}})
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
      setStoreData({...storeData, logoWhite: { public_id: response.data.image.public_id, url: response.data.image.url}})
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
        <title>Configuración</title>
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
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Logo blanco de la tienda</p>
                  <input onChange={imageChange2} type='file' className='text-sm' />
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Instagram de la tienda</p>
                  <input type='text' name='instagram' value={storeData.instagram} onChange={inputChange} placeholder='Instagram' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Facebook de la tienda</p>
                  <input type='text' name='facebook' value={storeData.facebook} onChange={inputChange} placeholder='Facebook' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>Tik Tok de la tienda</p>
                  <input type='text' name='tiktok' value={storeData.tiktok} onChange={inputChange} placeholder='Tik Tok' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <p className='text-sm mb-2'>WhatsApp de la tienda</p>
                  <input type='text' name='whatsapp' value={storeData.whatsapp} onChange={inputChange} placeholder='WhatsApp' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
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
                <div className='flex gap-4 mb-4'>
                  <div className='flex flex-col gap-2 w-1/2'>
                    <p className='text-sm'>Región</p>
                    <select className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' onChange={regionChange}>
                      <option>Seleccionar Región</option>
                      {
                      regions !== undefined
                        ? regions.map(region => <option key={region.regionId}>{region.regionName}</option>)
                        : ''
                      }
                    </select>
                  </div>
                  <div className='flex flex-col gap-2 w-1/2'>
                    <p className='text-sm'>Ciudad</p>
                    <select className='font-light p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' onChange={cityChange}>
                      <option>Seleccionar Ciudad</option>
                      {citys?.map(city => <option key={city.countyCode}>{city.countyName}</option>)}
                    </select>
                  </div>
                </div>
                <div className=''>
                  <p className='text-sm mb-2'>Horario de atención</p>
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2'>
                        <input type='checkbox' checked={storeData.schedule?.monday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.monday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Lunes</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.monday.open} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.monday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.monday.close} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.monday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2'>
                        <input type='checkbox' checked={storeData.schedule?.tuesday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.tuesday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Martes</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.tuesday.open} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.tuesday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.tuesday.close} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.tuesday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2'>
                        <input type='checkbox' checked={storeData.schedule?.wednesday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.wednesday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Miercoles</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.wednesday.open} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.wednesday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.wednesday.close} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.wednesday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2'>
                        <input type='checkbox' checked={storeData.schedule?.thursday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.thursday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Jueves</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.thursday.open} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.thursday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.thursday.close} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.thursday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2'>
                        <input type='checkbox' checked={storeData.schedule?.friday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.friday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Viernes</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.friday.open} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.friday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.friday.close} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.friday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2'>
                        <input type='checkbox' checked={storeData.schedule?.saturday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.saturday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Sabado</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.saturday.open} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.saturday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.saturday.close} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.saturday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                    </div>
                    <div className='flex gap-2 justify-between'>
                      <div className='flex gap-2'>
                        <input type='checkbox' checked={storeData.schedule?.sunday.state} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.sunday.state = e.target.checked
                          setStoreData({ ...storeData, schedule: schedule })
                        }} />
                        <p className='text-sm my-auto'>Domingo</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Apertura:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.sunday.open} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.sunday.open = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                      <div className='flex gap-2'>
                        <p className='text-sm my-auto'>Cierre:</p>
                        <input type='text' placeholder='00:00' value={storeData.schedule?.sunday.close} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const schedule = storeData.schedule!
                          schedule.sunday.close = e.target.value
                          setStoreData({ ...storeData, schedule: schedule })
                        }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                      </div>
                    </div>
                  </div>
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