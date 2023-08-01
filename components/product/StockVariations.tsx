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
    const uploadImage = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, {image: e[0]}, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    const img = { public_id: uploadImage.data.image.public_id, url: uploadImage.data.image.url }
    setInformation((prev: any) => {
      const newVariation = {...prev.variations}
      newVariation.variations[indexImage].image = img
      return {...prev, variations: newVariation}
    })
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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
      <div className='flex flex-col gap-4'>
        <h2>Variaciones</h2>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm'>Ingresa el nombre de la variación</p>
            <input onChange={(e: any) => {
              let mod = information.variations
              mod!.nameVariation = e.target.value
              setInformation({ ...information, variation: mod })
            }} type='text' placeholder='Color' value={information.variations?.nameVariation} className='text-sm font-light p-1.5 w-64 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          </div>
          {
            information.variations?.nameSubVariation !== undefined
              ? (
                <div className='flex flex-col gap-2'>
                  <p className='text-sm'>Ingresa el nombre de la subvariación</p>
                  <input onChange={(e: any) => {
                    let mod = information.variations
                    mod!.nameSubVariation = e.target.value
                    setInformation({ ...information, variation: mod })
                  }} type='text' placeholder='Color' value={information.variations.nameSubVariation} className='text-sm font-light p-1.5 w-64 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
              )
              : (
                <button onClick={(e: any) => {
                  e.preventDefault()
                  let mod = information.variations
                  mod!.nameSubVariation = ''
                  setInformation({ ...information, variations: mod })
                }} className='bg-main text-white w-fit py-1.5 px-6 rounded-md text-sm'>Crear subvariación</button>
              )
          }
          {
            information.variations?.nameVariation !== ''
              ? (
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2'>
                    <p className='text-sm font-light w-20'>Imagen</p>
                    <p className='text-sm font-light w-32'>Variación</p>
                    {
                      information.variations?.nameSubVariation !== undefined
                        ? <p className='text-sm font-light w-32'>Subvariación</p>  
                        : ''
                    }
                    <p className='text-sm font-light w-20'>Stock</p>
                    <p className='text-sm font-light'>SKU</p>
                  </div>
                  {
                    information.variations?.variations?.length
                      ? information.variations?.variations.map((variation, index) => (
                        <div className='flex flex-col gap-2' key={index}>
                          <div className='flex gap-2'>
                            <div {...getRootProps()} className={`flex w-20 h-20 border rounded-lg cursor-pointer ${isDragActive ? 'bg-neutral-100' : 'bg-white'}`}>
                              <div onClick={() => indexImage = index} className='w-20 h-20 flex'>
                                <input {...getInputProps()} />
                                {
                                  variation.image?.url !== undefined
                                    ? <img src={variation.image?.url} alt={variation.image?.url} className='w-16 h-16 m-auto' />
                                    : <CiImageOn className='text-3xl m-auto text-neutral-400' />
                                }
                              </div>
                            </div>
                            <input type='text' placeholder='Azul' onChange={(e: any) => {
                              let mod = information.variations
                              mod!.variations[index].variation = e.target.value
                              setInformation({ ...information, variations: mod })
                            }} value={variation.variation} className='text-sm font-light w-32 p-1.5 h-fit mb-auto mt-auto border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                            {
                              information.variations?.nameSubVariation !== undefined
                                ? (
                                  <input type='text' placeholder='Azul' onChange={(e: any) => {
                                    let mod = information.variations
                                    mod!.variations[index].subVariation = e.target.value
                                    setInformation({ ...information, variations: mod })
                                  }} value={variation.subVariation} className='text-sm font-light w-32 p-1.5 h-fit mb-auto mt-auto border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                )
                                : ''
                            }
                            <input type='number' placeholder='Stock' onChange={(e: any) => {
                              let mod = information.variations
                              mod!.variations[index].stock = e.target.value
                              setInformation({ ...information, variations: mod })
                            }} value={variation.stock} className='text-sm font-light w-20 p-1.5 h-fit mb-auto mt-auto border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                            <input type='text' placeholder='SKU' name='sku' onChange={(e: any) => {
                              let mod = information.variations
                              mod!.variations[index].sku = e.target.value
                              setInformation({ ...information, variations: mod })
                            }} value={variation.sku} className='text-sm font-light w-32 h-fit mb-auto mt-auto p-1.5 border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                            <button onClick={(e: any) => {
                              e.preventDefault()
                              const updatedVariations = { ...information.variations }
                              updatedVariations.variations = updatedVariations.variations?.filter((vari, i) => i !== index)
                              setInformation({ ...information, variations: updatedVariations })
                            }}><AiOutlineClose /></button>
                          </div>
                        </div>
                      ))
                      : ''
                  }
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    let mod = information.variations
                    mod!.variations.push({ variation: '', stock: 0 })
                    setInformation({ ...information, variations: mod })
                  }} className='bg-main text-white w-fit py-1.5 px-6 rounded-md text-sm'>Agregar variación</button>
                </div>
              )
              : ''
          }
        </div>
      </div>
    </div>
  )
}
