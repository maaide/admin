import { ICategory, IProduct, ITag } from '@/interfaces'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner2 } from '../ui'

interface Props {
  information: IProduct
  setInformation: any
  categories: ICategory[] | undefined
  setNewCategory: any
}

export const CategoryProduct: React.FC<Props> = ({information, setInformation, categories, setNewCategory}) => {

  const [tags, setTags] = useState<ITag[]>([])
  const [tag, setTag] = useState('')
  const [tagLoading, setTagLoading] = useState(false)

  const getTags = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags`)
    setTags(response.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  const inputChange = async (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }

  const tagChange = (e: any) => {
    setTag(e.target.value)
  }

  const inputTagChange = (e: any) => {
    if (e.target.checked) {
      setInformation({...information, tags: information.tags.concat([e.target.name])})
    } else {
      const tagsFilter = information.tags.filter(tag => tag !== e.target.name)
      setInformation({...information, tags: tagsFilter})
    }
  }

  const newTagSubmit = async (e: any) => {
    e.preventDefault()
    setTagLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {tag: tag})
    getTags()
    setTag('')
    setTagLoading(false)
  }

  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <div className='mb-4'>
        <h2 className='mb-4'>Otros</h2>
        <h3 className='font-light text-sm mb-2'>Categoría</h3>
        <select value={information.category.category} onChange={(e: any) => {
          const category = categories?.find(category => category.category === e.target.value)
          setInformation({ ...information, category: { category: category?.category, slug: category?.slug } })
        }} name='category' className='p-1.5 rounded mb-2 w-full border text-sm font-light focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
          <option>Seleccionar categoría</option>
          {
            categories?.map(category => (
              <option key={category._id}>{category.category}</option>
            ))
          }
        </select>
        <button onClick={(e: any) => {
          e.preventDefault()
          setNewCategory('flex')
        }} className='bg-main pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4'>Crear nueva categoria</button>
      </div>
      <div className='mb-4'>
        <h3 className='text-sm font-light mb-2'>Tags</h3>
        {
          tags?.length
            ? (
              <div className='flex gap-2 flex-wrap mb-2'>
                {tags.map(tag => (
                  <div className='flex gap-1' key={tag._id?.toString()}>
                    <input type='checkbox' checked={information.tags.find(e => e === tag.tag) ? true : false} name={tag.tag.toString()} onChange={inputTagChange} />
                    <span className='text-sm font-light'>{tag.tag}</span>
                  </div>
                ))}
              </div>
            )
            : ''
        }
        <div className='flex gap-2'>
          <input type='text' placeholder='Nuevo Tag' onChange={tagChange} value={tag} className='font-light p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
          <button onClick={newTagSubmit} className='bg-main text-white text-sm rounded-md h-8 w-20'>{tagLoading ? <Spinner2 /> : 'Crear'}</button>
        </div>
      </div>
      <div>
        <h3 className='text-sm font-light mb-2'>Url</h3>
        <input type='text' placeholder='Slug del producto' name='slug' onChange={inputChange} value={information.slug} className='font-light p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
      </div>
    </div>
  )
}
