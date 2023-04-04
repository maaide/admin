import { ICategory } from '@/interfaces'
import axios from 'axios'
import React from 'react'

interface Props {
  setCategoryInfo: any
  categoryInfo: ICategory
}

export const Media: React.FC<Props> = ({ setCategoryInfo, categoryInfo }) => {

  const imageChange = async (e: any) => {
    const { data } = await axios.post('https://server-production-e234.up.railway.app/product-image-upload', { image: e.target.files[0] }, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    setCategoryInfo({...categoryInfo, image: data.image.url})
  }

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='mb-4'>Elementos muntimedia</h2>
      <input type='file' onChange={imageChange} className='font-light text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
      {
        categoryInfo.image
          ? (
            <div className='mt-3'>
              <img src={categoryInfo.image} alt={categoryInfo.category} />
            </div>
          )
          : ''
      }
    </div>
  )
}
