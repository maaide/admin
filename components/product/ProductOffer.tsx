import { IProduct } from '@/interfaces'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IProductsOffer } from '../../interfaces/products'

interface Props {
  productsOffer: IProductsOffer[]
  setProductsOffer: any
}

export const ProductOffer: React.FC<Props> = ({productsOffer, setProductsOffer}) => {

  const [products, setProducts] = useState<IProduct[]>([])

  const getProducts = async () => {
    const response = await axios.get(`${process.env.API_URL}/products`)
    setProducts(response.data)
  }

  useEffect(() => {
    getProducts()
  }, [])
    
  return (
    <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
      <h2 className='mb-4'>Ofertas complementarias</h2>
      {
        productsOffer.length
        ? (
          productsOffer?.map((sale, index) => (
            <div key={index} className='mb-4'>
              <h3 className='text-sm mb-2'>Oferta {index + 1}</h3>
              <p className='text-sm font-light mb-2'>Selecciona los productos para esta oferta</p>
              <select onChange={(e: any) => {
                const updatedProducts = productsOffer.map((productOffer, index1) => {
                  const productFind = products.find(product => product.name === e.target.value)
                  const productArray: any = [productFind]
                  if (index1 === index) {
                    return {
                      ...productOffer,
                      productsSale: productOffer.productsSale.concat(productArray)
                    }
                  }
                  return {
                    ...productOffer
                  }
                })
                setProductsOffer(updatedProducts)
              }} className='p-1.5 mb-2 rounded border text-sm font-light focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                <option>Seleccionar productos</option>
                {
                  products.length
                    ? products.map(product => (
                      <option key={product._id}>{product.name}</option>
                    ))
                    : ''
                }
              </select>
              <div>
                <p className='text-sm font-light mb-2'>Precio oferta</p>
                <input type='text' placeholder='Precio oferta' value={productsOffer[index].price!} onChange={(e: any) => {
                  const updatedProducts = productsOffer.map((productOffer, index1) => {
                    if (index1 === index) {
                      return {
                        ...productOffer,
                        price: e.target.value
                      }
                    }
                    return {
                      ...productOffer
                    }
                  })
                  setProductsOffer(updatedProducts)
                }} className='font-light p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
              </div>
              <div className='flex gap-2 flex-wrap mt-2'>
                {
                  sale.productsSale?.map(product => (
                    <div className='flex gap-2 rounded-lg border p-2 w-56 dark:border-neutral-600' key={product.name}>
                      <img className='w-20 h-20 mt-auto mb-auto rounded-lg' src={product.images[0]} />
                      <div className='mt-auto mb-auto'>
                        <p className='text-sm'>{product.name}</p>
                        <p className='text-sm font-light'>${NumberFormat(product.price)}</p>
                        {
                          product.beforePrice
                            ? <p className='text-xs font-light line-through'>${NumberFormat(product.beforePrice)}</p>
                            : ''
                        }
                      </div>
                      <button onClick={(e: any) => {
                        e.preventDefault()
                        const updatedProducts = productsOffer.map((productOffer, index1) => {
                          if (index1 === index) {
                            return {
                              ...productOffer,
                              productsSale: productOffer.productsSale.filter(productSale => productSale.name !== product.name)
                            }
                          }
                          return {
                            ...productOffer
                          }
                        })
                        setProductsOffer(updatedProducts)
                      }}><AiOutlineClose /></button>
                    </div>
                  ))
                }
              </div>
              {
                productsOffer.length === index + 1
                  ? (
                    <button onClick={(e: any) => {
                      e.preventDefault()
                      setProductsOffer(productsOffer.concat([{productsSale: [], price: 0}]))
                    }} className='bg-main block mt-2 -mb-2 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4'>Crear otra oferta</button>
                  )
                  : ''
              }
            </div>
          ))
        )
        : ''
      }
    </div>
  )
}
