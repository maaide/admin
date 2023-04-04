import { IProduct } from '@/interfaces'
import axios from 'axios'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineClose } from 'react-icons/ai'
import { CiImageOn } from 'react-icons/ci'

interface Props {
  information: IProduct,
  setInformation: any
}

export const StockVariations: React.FC<Props> = ({information, setInformation}) => {

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  let indexImage: any

  const onDrop = async (e: any) => {
    const uploadImage = await axios.post('https://server-production-e234.up.railway.app/product-image-upload', {image: e[0]}, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    const img = uploadImage.data.image.url
    setInformation((prev: any) => {
      const newVariation = [...prev.variations]
      newVariation[indexImage].image = img
      return {...prev, variations: newVariation}
    })
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleInputChange = (index: number, key: string, value: any) => {
    setInformation((prev: any) => {
      const newVariation = [...prev.variations]
      newVariation[index][key] = value
      return {...prev, variations: newVariation}
    })
  }

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='mb-4'>Inventario</h2>
      <div className='mb-4'>
        <div className='flex gap-2'>
          <div>
            <h3 className='mb-2 text-sm font-light'>Stock</h3>
            <input type='number' placeholder='Stock' name='stock' onChange={inputChange} value={information.stock} className='text-sm font-light p-1.5 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
          <div>
            <h3 className='mb-2 text-sm font-light'>SKU</h3>
            <input type='text' placeholder='SKU' name='sku' onChange={inputChange} value={information.sku} className='text-sm font-light p-1.5 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
        </div>
      </div>
      <div>
        <h2 className='mb-4'>Variaciones</h2>
        <h3 className='mb-2 text-sm font-light'>Ingresa el nombre de la variación</h3>
        <input type='text' placeholder='Color' name='nameVariations' onChange={inputChange} value={information.nameVariations} className='text-sm font-light p-1.5 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        {
          information.nameVariations !== ''
            ? (
              <div className='flex flex-col gap-2 mt-4'>
                <div className='flex gap-2'>
                  <p className='text-sm font-light w-20'>Imagen</p>
                  <p className='text-sm font-light w-40'>Variación</p>
                  <p className='text-sm font-light w-32'>Stock</p>
                  <p className='text-sm font-light'>SKU</p>
                </div>
                <div className='flex flex-col gap-2'>
                  {
                    information.variations?.length
                      ? information.variations.map((variation, index) => (
                        <div key={index} className='flex gap-2 w-full'>
                          <div {...getRootProps()} className={`flex w-20 h-20 border rounded-lg cursor-pointer ${isDragActive ? 'bg-neutral-100' : 'bg-white'}`}>
                            <div onClick={() => indexImage = index} className='w-20 h-20 flex'>
                              <input {...getInputProps()} />
                                {
                                  variation.image
                                    ? <img src={variation.image} alt={variation.image} className='w-16 h-16 m-auto' />
                                    : <CiImageOn className='text-3xl m-auto text-neutral-400' />
                                }
                            </div>
                          </div>
                          <input type='text' placeholder='Azul' name='variation' onChange={(e: any) => {handleInputChange(index, 'variation', e.target.value)}} value={variation.variation} className='text-sm font-light w-40 p-1.5 h-fit mb-auto mt-auto border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          <input type='number' placeholder='Stock' name='stock' onChange={(e: any) => {handleInputChange(index, 'stock', e.target.value)}} value={variation.stock} className='text-sm font-light w-32 p-1.5 h-fit mb-auto mt-auto border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          <input type='text' placeholder='SKU' name='sku' onChange={(e: any) => {handleInputChange(index, 'sku', e.target.value)}} value={variation.sku} className='text-sm font-light w-40 h-fit mb-auto mt-auto p-1.5 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            const filterVariation = information.variations?.filter(vari => vari.variation !== variation.variation)
                            setInformation({...information, variations: filterVariation})
                          }}><AiOutlineClose /></button>
                        </div>
                      ))
                      : ''
                  }
                </div>
                <button onClick={(e: any) => {
                  e.preventDefault()
                  setInformation({...information, variations: information.variations?.concat([{image: '', variation: '', stock: 0}])})
                }} className='w-fit bg-main pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4'>Crear nueva variación</button>
              </div>
            )
            : ''
        }
      </div>
    </div>
  )
}
