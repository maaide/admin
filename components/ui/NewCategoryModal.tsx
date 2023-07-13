import { ICategory } from '@/interfaces'
import axios from 'axios'
import React, { useState } from 'react'
import { Spinner2 } from './'

interface Props {
  newCategory: any,
  setNewCategory: any,
  setNewCategoryData: any,
  newCategoryData: ICategory
}

export const NewCategoryModal: React.FC<Props> = ({ newCategory, setNewCategory, setNewCategoryData, newCategoryData }) => {

  const [descriptionLoading, setDecriptionLoading] = useState(false)
  const [onModal, setOnModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('Experto')
  const [newType, setNewType] = useState('')

  const inputCategoryChange = (e: any) => {
    setNewCategoryData({ ...newCategoryData, [e.target.name]: e.target.value })
  }

  const generateDescription = async () => {
    setDecriptionLoading(true)
    const response = await axios.post(`${process.env.API_URL}/ai-description-category`, { description: newCategoryData.category, type: type === 'Personalizado' ? newType : type })
    const filterSeo = response.data[0].text.split('\n').filter((item: any) => item !== '')
    setNewCategoryData({ ...newCategoryData, description: filterSeo })
    setDecriptionLoading(false)
  }

  const imageChange = async (e: any) => {
    const { data } = await axios.post(`${process.env.API_URL}/product-image-upload`, { image: e.target.files[0] }, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    setNewCategoryData({...newCategoryData, image: data.image.url})
  }

  const handleSubmit = async () => {
    setLoading(true)
    await axios.post(`${process.env.API_URL}/categories`, newCategoryData)
    setNewCategory('hidden')
    setLoading(false)
  }

  return (
    <div className={`fixed right-0 bg-black/20 ${newCategory} dark:bg-black/40`} onClick={() => onModal ? '' : setNewCategory('hidden') } style={{ width: 'calc(100% - 256px)', height: 'calc(100% - 56px)' }}>
      <div className='p-6 bg-white w-[600px] rounded-md shadow-md h-fit m-auto dark:bg-neutral-800' onMouseEnter={() => setOnModal(true)} onMouseLeave={() => setOnModal(false)}>
        <h2 className='mb-2'>Nueva categoría</h2>
        <div>
          <h3 className='text-sm font-light mb-2'>Nombre</h3>
          <input type='text' placeholder='Nombre de la categoría' name='category' onChange={inputCategoryChange} value={newCategoryData.category} className='mb-2 w-full p-1.5 text-sm font-light border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' /> 
          <h3 className='text-sm font-light mb-2'>Descripción</h3>
          <textarea placeholder='Descripción de la categoría' name='description' onChange={inputCategoryChange} value={newCategoryData.description} className='w-full h-24 p-1.5 text-sm font-light border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
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
          {
            newCategoryData.category !== ''
              ? (
                <button onClick={(e: any) => {
                    e.preventDefault()
                    generateDescription()
                  }} className='w-[350px] mb-2 cursor-pointer h-9 text-sm bg-gradient-to-r text-white rounded-md from-violet-500 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-700'>{descriptionLoading ? <svg aria-hidden="true" className="w-5 h-5 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg> : 'Crear descripción con inteligencia artificial'}</button>
              )
              : (
                <button onClick={(e: any) => e.preventDefault()} className='w-[350px] cursor-not-allowed mb-2 h-9 text-sm bg-gradient-to-r text-white rounded-md from-violet-300 to-fuchsia-300'>{descriptionLoading ? <svg aria-hidden="true" className="w-5 h-5 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg> : 'Crear descripción con inteligencia artificial'}</button>
              )
          }
          <h3 className='text-sm font-light mb-2'>Url</h3>
          <input type='text' placeholder='Slug de la url' name='slug' onChange={inputCategoryChange} className='mb-2 w-full p-1.5 text-sm font-light border rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          <h3 className='text-sm font-light mb-2'>Imagen</h3>
          <input type='file' onChange={imageChange} className='font-light text-sm mt-2 mb-4 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
          <div className='flex gap-4'>
            <button onClick={handleSubmit} className='bg-main pt-1.5 pb-1.5 text-white text-sm rounded-md w-36'>{loading ? <Spinner2 /> : 'Crear categoría'}</button>
            <a onClick={() => setNewCategory('hidden')} className='text-sm rounded-md cursor-pointer mt-auto mb-auto font-light'>Cancelar</a>
          </div>
        </div>
      </div>
    </div>
  )
}
