import { IProduct } from '@/interfaces'
import axios from 'axios'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { CiImageOn } from 'react-icons/ci'

interface Props {
  information: IProduct
  setInformation: any
}

export const Media: React.FC<Props> = ({ information, setInformation }) => {

  const onDrop = (acceptedFiles: any) => {
    let images = information.images
    acceptedFiles.map(async (acceptedFile: any) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, {image: acceptedFile}, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': 'multipart/form-data'
        }
      })
      images = images.concat(response.data.image.url)
      setInformation({...information, images: images})
    })
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='mb-4'>Elementos muntimedia</h2>
      <div className='flex gap-2 flex-wrap'>
        <div {...getRootProps()} className={`flex w-28 h-28 border rounded-lg cursor-pointer dark:bg-neutral-700 dark:border-neutral-600 ${isDragActive ? 'bg-neutral-100' : 'bg-white'}`}>
          <div className='w-28 h-28 flex'>
            <input {...getInputProps()} />
            <CiImageOn className='text-3xl m-auto text-neutral-400' />
          </div>
        </div>
        {
          information.images
            ? information.images.map(image => (
              <img className='w-28 h-28 shadow-md rounded-md' key={image} src={image} />
            ))
            : ''            
        }
      </div>
    </div>
  )
}
