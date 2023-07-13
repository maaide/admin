import { IProduct } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Spinner2 } from '../ui'

interface Props {
  information: IProduct
  setInformation: any
}

export const ProductSeo: React.FC<Props> = ({information, setInformation}) => {

  const [aiLoading, setAiLoading] = useState(false)
  const [aiView, setAiView] = useState(false)
  const [mouseInModal, setMouseInModal] = useState(false)
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Experto')
  const [newType, setNewType] = useState('')
  const [titleSeo, setTitleSeo] = useState('')
  const [descriptionSeo, setDescriptionSeo] = useState('')

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const generateSeo = async (e: any) => {
    e.preventDefault()
    setAiLoading(true)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai-product-seo`, { description: description, type: type === 'Personalizado' ? newType : type })
    const filterTitleSeo = response.data.title
    const filterDescriptionSeo = response.data.description
    setTitleSeo(filterTitleSeo)
    setDescriptionSeo(filterDescriptionSeo)
    setAiLoading(false)
  }

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <div>
        <h2 className='mb-4'>Configuración SEO</h2>
        <div className='mb-4'>
          <h3 className='text-sm font-light mb-2'>Titulo SEO</h3>
          <input type='text' placeholder='Titulo SEO' name='titleSeo' onChange={inputChange} value={information.titleSeo} className='text-sm mb-4 font-light p-1.5 border rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <div className='mb-4'>
          <h3 className='text-sm font-light mb-2'>Descripción SEO</h3>
          <textarea placeholder='Descripción SEO' name='descriptionSeo' onChange={inputChange} value={information.descriptionSeo} className='text-sm font-light p-1.5 h-24 border rounded w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
        </div>
        <button onClick={(e: any) => {
          e.preventDefault()
          setAiView(true)
        }} className='w-[300px] cursor-pointer h-9 text-sm bg-gradient-to-r text-white rounded-md from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700'>Generar con inteligencia artificial</button>
        {
          aiView
            ? (
              <div onClick={() => mouseInModal ? '' : setAiView(false)} className='bg-black/20 flex fixed top-[57px] left-[256px]' style={{ width: 'calc(100% - 256px)', height: 'calc(100% - 56px)' }}>
                <div onMouseEnter={() => setMouseInModal(true)} onMouseLeave={() => setMouseInModal(false)} className='bg-white m-auto p-6 dark:bg-neutral-800 w-[500px] rounded-md shadow-xl'>
                  <h3 className='mb-4'>Generar SEO con inteligencia artificial</h3>
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
                  <button onClick={generateSeo} className='w-full cursor-pointer h-9 text-sm bg-gradient-to-r text-white rounded-md from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700'>{aiLoading ? <Spinner2 /> : 'Generar SEO'}</button>
                  {
                    titleSeo !== ''
                      ? (
                        <div>
                          <input type='text' placeholder='Descripción generada por la inteligencia artificial' value={titleSeo} onChange={(e: any) => setTitleSeo(e.target.value)} className='w-full mt-4 p-1.5 mb-2 border rounded text-sm font-light focus:outline-none focus:border-main focus:ring-1 focus:ring-main' />
                          <button className='p-1.5 text-sm bg-main text-white rounded-md w-full' onClick={(e: any) => {
                            e.preventDefault()
                            setAiView(false)
                            setInformation({...information, titleSeo: titleSeo})
                          }}>Usar titulo SEO</button>
                        </div>
                      )
                      : ''
                  }
                  {
                    descriptionSeo !== ''
                      ? (
                        <div>
                          <textarea placeholder='Descripción generada por la inteligencia artificial' name='descriptionAi' value={descriptionSeo} onChange={(e: any) => setDescriptionSeo(e.target.value)} className='w-full mt-4 p-1.5 mb-1 border rounded text-sm font-light h-28 focus:outline-none focus:border-main focus:ring-1 focus:ring-main' />
                          <button className='p-1.5 text-sm bg-main text-white rounded-md w-full' onClick={(e: any) => {
                            e.preventDefault()
                            setAiView(false)
                            setInformation({...information, descriptionSeo: descriptionSeo})
                          }}>Usar descripción SEO</button>
                        </div>
                      )
                      : ''
                  }
                  {
                    titleSeo !== '' && descriptionSeo !== ''
                      ? (
                        <button className='p-1.5 text-sm bg-main text-white rounded-md mt-2 w-full' onClick={(e: any) => {
                          e.preventDefault()
                          setAiView(false)
                          setInformation({...information, titleSeo: titleSeo, descriptionSeo: descriptionSeo})
                        }}>Usar ambos</button>
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
