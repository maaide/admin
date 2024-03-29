import { LeftMenu, Spinner } from '@/components/ui'
import { IStadistics } from '@/interfaces/stadistics'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import React, { ChangeEvent, useEffect, useState } from 'react'

const StadisticsPage = () => {

  const [stadistics, setStadistics] = useState<IStadistics>()
  const [filter, setFilter] = useState({
    dateInitial: undefined,
    dateLast: undefined
  })
  const [loading, setLoading] = useState(true)

  const getStadistics = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stadistics`)
    setStadistics(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getStadistics()
  }, [])

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleFilter = async () => {
    setLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stadistics`, filter)
    setStadistics(response.data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Estadisticas</title>
      </Head>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 70px)', overflow: 'overlay' }}>
          <div className='flex flex-col gap-2 w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Estadisticas</h1>
            <p>Estadisticas de la tienda</p>
            <div className='flex gap-2'>
              <div>
                <p className='text-sm mb-1'>Desde</p>
                <input type='date' onChange={inputChange} name='dateInitial' className='w-fit p-1.5 border rounded text-sm font-light focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div>
                <p className='text-sm mb-1'>Hasta</p>
                <input type='date' onChange={inputChange} name='dateLast' className='w-fit p-1.5 border rounded text-sm font-light focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <button onClick={handleFilter} className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 mt-auto rounded-md bg-main text-white'>Filtrar</button>
            </div>
          </div>
          <div className='flex gap-4 w-full flex-wrap max-w-1280 m-auto mb-4'>
            {
              loading
                ? (
                  <div className='w-full flex mt-20'>
                    <div className='w-fit m-auto'>
                      <Spinner />
                    </div>
                  </div>
                )
                : stadistics?.totalSell || stadistics?.addCarts || stadistics?.informations || stadistics?.sells || stadistics?.viewContents
                  ? (
                    <>
                      <div className='p-6 w-1/4 flex flex-col gap-2 border bg-white rounded-md dark:bg-neutral-800 dark:border-neutral-700'>
                        <p>Total vendido</p>
                        <p className='text-xl'>${NumberFormat(Number(stadistics.totalSell))}</p>
                      </div>
                      <div className='p-6 w-1/4 flex flex-col gap-2 border bg-white rounded-md dark:bg-neutral-800 dark:border-neutral-700'>
                        <p>Ventas</p>
                        <p className='text-xl'>{stadistics.sells}</p>
                      </div>
                      <div className='p-6 w-1/4 flex flex-col gap-2 border bg-white rounded-md dark:bg-neutral-800 dark:border-neutral-700'>
                        <p>Productos visitados</p>
                        <p className='text-xl'>{stadistics.viewContents}</p>
                      </div>
                      <div className='p-6 w-1/4 flex flex-col gap-2 border bg-white rounded-md dark:bg-neutral-800 dark:border-neutral-700'>
                        <p>Añadidos al carrito</p>
                        <p className='text-xl'>{stadistics.addCarts}</p>
                      </div>
                      <div className='p-6 w-1/4 flex flex-col gap-2 border bg-white rounded-md dark:bg-neutral-800 dark:border-neutral-700'>
                        <p>Añadir información</p>
                        <p className='text-xl'>{stadistics.informations}</p>
                      </div>
                    </>
                  )
                  : <p>No hay estadisticas disponibles</p>
            }
          </div>
        </div>
    </>
  )
}

export default StadisticsPage