import { IProduct } from '@/interfaces'
import React from 'react'

interface Props {
  information: IProduct
  setInformation: any
}

export const Price: React.FC<Props> = ({information, setInformation}) => {

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <div className='pb-4 border-b dark:border-neutral-600'>
        <h2 className='mb-4'>Precio</h2>
        <div className='flex gap-2'>
          <div className='w-1/2'>
            <h3 className='text-sm font-light mb-2'>Precio</h3>
            <input type='text' placeholder='Precio actual' value={information.price} name='price' onChange={inputChange} className='font-light w-full p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
          <div className='w-1/2'>
            <h3 className='text-sm font-light mb-2'>Precio anterior</h3>
            <input type='text' placeholder='Precio anterior' value={information.beforePrice} name='beforePrice' onChange={inputChange} className='font-light w-full p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-sm font-light mb-2'>Costo del producto</p>
        <input type='text' placeholder='Costo' name='cost' onChange={inputChange} value={information.cost} className='font-light p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
    </div>
  )
}
