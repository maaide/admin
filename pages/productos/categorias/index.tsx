import Link from 'next/link'
import React from 'react'
import { LeftMenu, Spinner } from '../../../components/ui/'
import Head from 'next/head'
import { useCategories, useProducts } from '@/hooks'
import { useRouter } from 'next/router'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'

const Categories = () => {

  const {isLoadingCategories, categories} = useCategories('/categories')
  const {products} = useProducts('/products')
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Categorías</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
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
                                <p className='font-light'>{products.length ? products.filter(product => product.category === category.category).length : ''}</p>
                              </td>
                              <td className='p-2'>
                                <button onClick={async(e: any) => {
                                  e.preventDefault()
                                  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category._id}`)
                                  router.reload()
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