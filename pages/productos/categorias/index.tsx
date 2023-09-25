import Link from 'next/link'
import React, { useState } from 'react'
import { LeftMenu, Spinner, Spinner2 } from '../../../components/ui/'
import Head from 'next/head'
import { useCategories, useProducts } from '@/hooks'
import { useRouter } from 'next/router'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'

const Categories = () => {

  const {isLoadingCategories, categories} = useCategories('/categories')
  const {products} = useProducts('/products')
  const router = useRouter()

  const [popupView, setPopupView] = useState('hidden')
  const [popupMouse, setPopupMouse] = useState(false)
  const [categorySelect, setcategorySelect] = useState({
    _id: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)

  const deleteCategory = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categorySelect._id}`)
    router.reload()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Categorías</title>
      </Head>
      <LeftMenu>
        <div onClick={() => !popupMouse ? setPopupView('hidden') : ''} className={`${popupView} right-0 fixed flex bg-black/20 dark:bg-black/40`} style={{ width: 'calc(100% - 70px)', height: 'calc(100vh - 56px)' }}>
          <div onMouseEnter={() => setPopupMouse(true)} onMouseLeave={() => setPopupMouse(false)} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar la categoria <strong>{categorySelect.name}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteCategory} className='bg-red-500 h-10 w-36 rounded-md text-white'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => setPopupView('hidden')}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 70px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Categorías</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white' href='/productos/categorias/nueva-categoria'>Nueva categoría</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              isLoadingCategories
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : categories.length
                  ? (
                    <table className='shadow-md w-full border dark:border-neutral-600'>
                      <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        <tr>
                          <th className='text-left p-2 font-normal'>Categoría</th>
                          <th className='text-left p-2 font-normal'>Slug</th>
                          <th className='text-left p-2 font-normal'>Cantidad productos</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        {
                          categories.map(category => (
                            <tr key={category._id} className='border-b cursor-pointer w-full dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700'>
                              <td className='flex gap-2 p-2' onClick={() => router.push(`/productos/categorias/${category.slug}`)}>
                                <img className='w-20' src={category.image?.url} alt={category.category} />
                                <div className='mt-auto mb-auto w-full'>
                                  <p className='font-light'>{category.category}</p>
                                </div>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/categorias/${category.slug}`)}>
                                <p className='font-light'>{category.slug}</p>
                              </td>
                              <td className='p-2' onClick={() => router.push(`/productos/categorias/${category.slug}`)}>
                                <p className='font-light'>{products.length ? products.filter(product => product.category.category === category.category).length : ''}</p>
                              </td>
                              <td className='p-2'>
                                <button onClick={async(e: any) => {
                                  e.preventDefault()
                                  setPopupView('flex')
                                  setcategorySelect({ _id: category._id!, name: category.category })
                                }}><AiOutlineClose /></button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
                  : 'No hay categorias'
            }
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default Categories