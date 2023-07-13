import { LeftMenu, Spinner } from '@/components/ui'
import { useProducts } from '@/hooks'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Products = () => {

  const {isLoadingProducts, products} = useProducts('/products')
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Productos</title>
      </Head>
      <LeftMenu>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Productos</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white' href='/productos/nuevo-producto'>Nuevo producto</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              isLoadingProducts
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : <table className='shadow-md w-full border dark:border-neutral-600'>
                  <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                    <tr>
                      <th className='text-left p-2 font-normal'>Producto</th>
                      <th className='text-left p-2 font-normal'>Precio</th>
                      <th className='text-left p-2 font-normal'>Estado</th>
                      <th className='text-left p-2 font-normal'>Stock</th>
                      <th className='text-left p-2 font-normal'>Categoria</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                    {
                      products.map(product => (
                        <tr className='border-b cursor-pointer w-full dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700' key={product._id}>
                          <td className='flex gap-2 p-2' style={{width: '100%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                            <img className='w-20' src={product.images[0]} />
                            <div className='mt-auto mb-auto w-full'>
                              <p className='font-light'>{product.name}</p>
                            </div>
                          </td>
                          <td className='p-2' style={{width: '15%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                            <p className='font-light'>${NumberFormat(product.price)}</p>
                            {
                              product.beforePrice
                                ? <p className='font-light text-sm line-through'>${NumberFormat(product.beforePrice)}</p>
                                : ''
                            }
                          </td>
                          <td className='p-2' style={{width: '15%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                            {
                              product.state === true
                                ? <p className='font-light w-fit pt-1 pb-1 pl-2 pr-2 bg-green-500 rounded-md text-white'>Activo</p>
                                : <p className='font-light w-fit pt-1 pb-1 pl-2 pr-2 bg-red-500 rounded-md text-white'>Borrador</p>
                            }
                          </td>
                          <td className='p-2' style={{width: '10%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                            <p className='font-light'>{product.stock}</p>
                          </td>
                          <td className='p-2' style={{width: '20%'}} onClick={() => router.push(`/productos/${product.slug}`)}>
                            <p className='font-light'>{product.category}</p>
                          </td>
                          <td className='p-2'>
                            <button onClick={async(e: any) => {
                              e.preventDefault()
                              await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`)
                            }}><AiOutlineClose /></button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
            }
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default Products