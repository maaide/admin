import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Spinner2 } from '../ui'

interface Props {
  information: IProduct,
  setInformation: any
}

export const NameDescription: React.FC<Props> = ({information, setInformation}) => {

  const [descriptionAi, setDescriptionAi] = useState('')
  const [descriptionAiLoading, setDescriptionAiLoading] = useState(false)
  const [descriptionAiView, setDescriptionAiView] = useState(false)
  const [mouseInModal, setMouseInModal] = useState(false)
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [newType, setNewType] = useState('')

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const generateDescription = async (e: any) => {
    e.preventDefault()
    setDescriptionAiLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai-description-product`, { description: description, type: type === 'Personalizado' ? newType : type })
    setDescriptionAi(response.data)
    setDescriptionAiLoading(false)
  }

  const changeDescriptionAi = (e: any) => {
    setDescriptionAi(e.target.value)
  }

  return (
    <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
      <div className='mb-4'>
        <h3 className='mb-2 font-light text-sm'>Nombre</h3>
        <input type='text' placeholder='Nombre del producto' name='name' onChange={inputChange} value={information.name} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
      <div>
        <h3 className='mb-2 font-light text-sm'>Descripción</h3>
        <textarea placeholder='Descripción del producto' name='description' onChange={inputChange} value={information.description} className='w-full mb-1 p-1.5 border rounded text-sm font-light h-36 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        <button onClick={(e: any) => {
          e.preventDefault()
          setDescriptionAiView(true)
        }} className='w-[380px] cursor-pointer h-9 text-sm bg-gradient-to-r text-white rounded-md from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700'>Generar descripción con inteligencia artificial</button>
        {
          descriptionAiView
            ? (
              <div onClick={() => mouseInModal ? '' : setDescriptionAiView(false)} className='bg-black/20 flex fixed top-[57px] left-[256px]' style={{ width: 'calc(100% - 256px)', height: 'calc(100% - 56px)' }}>
                <div onMouseEnter={() => setMouseInModal(true)} onMouseLeave={() => setMouseInModal(false)} className='bg-white m-auto p-6 dark:bg-neutral-800 w-[500px] rounded-md shadow-xl'>
                  <h3 className='mb-4'>Generar descripción del producto</h3>
                  <p className='mb-2 text-sm'>Palabras claves del producto</p>
                  <textarea onChange={(e: any) => setDescription(e.target.value)} value={description} placeholder='Datos del producto' className='font-light h-20 p-1.5 rounded border text-sm w-full focus:outline-none mb-4 focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  <p className='mb-2 text-sm'>Tono del texto</p>
                  <select onChange={(e: any) => setType(e.target.value)} value={type} className='p-1.5 rounded mb-4 w-full border text-sm font-light focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                    <option>Experto</option>
                    <option>Persuasivo</option>
                    <option>Personalizado</option>
                  </select>
                  {
                    type === 'Personalizado'
                      ? (
                        <div className='mb-4'>
                          <p className='text-sm mb-2'>Tono personalizado</p>
                          <input type='text' placeholder='Tono' onChange={(e: any) => setNewType(e.target.value)} value={newType} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                        </div>
                      )
                      : ''
                  }
                  <button onClick={generateDescription} className='w-full cursor-pointer h-9 text-sm bg-gradient-to-r text-white rounded-md from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700'>{descriptionAiLoading ? <Spinner2 /> : 'Generar descripción'}</button>
                  {
                    descriptionAi !== ''
                      ? (
                        <div>
                          <textarea placeholder='Descripción generada por la inteligencia artificial' name='descriptionAi' value={descriptionAi} onChange={changeDescriptionAi} className='w-full mt-3 p-1.5 mb-4 border rounded text-sm font-light h-36 focus:outline-none focus:border-main focus:ring-1 focus:ring-main' />
                          <button className='p-1.5 text-sm bg-main text-white rounded-md w-full' onClick={(e: any) => {
                            e.preventDefault()
                            setDescriptionAiView(false)
                            setInformation({...information, description: descriptionAi})
                          }}>Usar descripción</button>
                        </div>
                      )
                      : ''
                  }
                </div>
              </div>
            )
            : ''
        }
      </div>
    </div>
  )
}
