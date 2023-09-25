import { ShippingCost } from '@/components/product'
import { LeftMenu, Spinner2 } from '@/components/ui'
import { IProduct, ISell } from '@/interfaces'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'

const NewSell = () => {

  const [sell, setSell] = useState<ISell>({
    address: '',
    cart: [],
    city: '',
    email: '',
    firstName: '',
    pay: '',
    region: '',
    shipping: 0,
    shippingMethod: '',
    shippingState: '',
    state: '',
    total: 0
  })
  const [products, setProducts] = useState<IProduct[]>([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [chilexpress, setChilexpress] = useState([])

  const router = useRouter()

  const initialEmail = ''

  const getProducts = async () => {
    const products = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    setProducts(products.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const inputChange = (e: any) => {
    setSell({...sell, [e.target.name]: e.target.value})
  }

  const selectProduct = (e: any) => {
    const product = products.find(product => product.name === e.target.value)
    if (product) {
      setSell({...sell, cart: sell.cart.concat({
        category: product.category.category,
        image: product.images[0].url,
        name: product.name,
        price: product.price,
        quantity: 1,
        slug: product.slug,
        _id: product._id,
        beforePrice: product.beforePrice ? product.beforePrice : undefined,
        stock: product.stock
      })})
    }
  }

  const sellSubmit = async () => {
    setSubmitLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sells`, sell)
    setSubmitLoading(false)
    router.push('/ventas')
  }

  return (
    <>
      <Head>
        <title>Nueva venta</title>
      </Head>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              {
                sell.email === initialEmail
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4'>Crear venta</button>
                  : <button onClick={sellSubmit} className='bg-main text-white text-sm rounded-md w-36 h-8'>{submitLoading ? <Spinner2 /> : 'Crear venta'}</button>
              }
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/ventas'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] mb-16 overflow-y-scroll dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)' }}>
          <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
            <Link href='/ventas' className='border rounded p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl mt-auto mb-auto'>Nueva venta</h1>
          </div>
          <form className='flex gap-4 max-w-1280 m-auto'>
            <div className='flex gap-4 flex-col w-2/3'>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Datos</h2>
                <div className='flex gap-2 mb-4'>
                  <div className='w-1/2'>
                    <h3 className='mb-2 font-light text-sm'>Nombre</h3>
                    <input type='text' placeholder='Nombre' name='firstName' onChange={inputChange} value={sell.firstName} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                  <div className='w-1/2'>
                    <h3 className='mb-2 font-light text-sm'>Apellido</h3>
                    <input type='text' placeholder='Apellido' name='lastName' onChange={inputChange} value={sell.lastName} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
                <div className='mb-4'>
                  <h3 className='mb-2 font-light text-sm'>Correo electronico</h3>
                  <input type='text' placeholder='Correo' name='email' onChange={inputChange} value={sell.email} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div>
                  <h3 className='mb-2 font-light text-sm'>Telefono</h3>
                  <div className='flex gap-2'>
                    <p className='border m-auto pt-1 text-sm pb-1 pl-2 pr-2 rounded dark:border-neutral-600'>+56</p>
                    <input type='text' placeholder='Telefono' name='phone' onChange={inputChange} value={sell.phone} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Dirección</h2>
                <div className='mb-4'>
                  <h3 className='mb-2 font-light text-sm'>Calle</h3>
                  <input type='text' placeholder='Calle' name='address' onChange={inputChange} value={sell.address} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='mb-4'>
                  <h3 className='mb-2 font-light text-sm'>Departamento, local, etc. (Opcional)</h3>
                  <input type='text' placeholder='Departamento' name='departament' onChange={inputChange} value={sell.departament} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <ShippingCost setClientData={setSell} clientData={sell} setChilexpress={setChilexpress} />
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Productos</h2>
                <div className='mb-4'>
                  <select onChange={selectProduct} className='font-light p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                    <option>Seleccionar producto</option>
                    {
                      products.length
                        ? products.map(product => (
                          <option key={product._id}>{product.name}</option>
                        ))
                        : ''
                    }
                  </select>
                </div>
                <div className='flex flex-col gap-2 mb-4'>
                  {
                    sell.cart.length
                      ? sell.cart.map((product, index) => (
                        <div className='flex gap-2 justify-between' key={product._id}>
                          <div className='flex gap-2'>
                            <img className='w-20 h-20' src={product.image} alt={`Imagen de producto ${product.name}`} />
                            <div className='mt-auto mb-auto'>
                              <p>{product.name}</p>
                              <p>${NumberFormat(product.price)}</p>
                              {
                                products.find(prod => prod.name === product.name)?.variations?.nameVariation !== ''
                                  ? (
                                    <select onChange={(e: any) => {
                                      const variation = products.find(prod => prod.name === product.name)?.variations?.variations.find(variation => variation.variation === e.target.value)
                                      product.variation = variation
                                      sell.cart[index] = product
                                      setSell({...sell, cart: sell.cart})
                                    }} className='font-light p-1 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                                      <option>Seleccionar variación</option>
                                      {
                                        products.find(prod => prod.name === product.name)?.variations?.variations.map(variation => (
                                          <option key={variation.variation}>{variation.variation}</option>
                                        ))
                                      }
                                    </select>
                                  )
                                  : ''
                              }
                            </div>
                          </div>
                          <input type='number' value={product.quantity} onChange={(e: any) => {
                            if (Number(product.stock) >= e.target.value && e.target.value >= 0) {
                              const updatedCart = [...sell.cart]
                              updatedCart[index].quantity = e.target.value
                              setSell({...sell, cart: updatedCart})
                            }
                          }} className='font-light p-1.5 rounded h-fit border text-sm w-20 mt-auto mb-auto focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          <p className='mt-auto mb-auto'>${NumberFormat(product.price * Number(product.quantity))}</p>
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            const updatedCart = sell.cart.filter(prod => prod.name !== product.name)
                            setSell({...sell, cart: updatedCart})
                          }}><IoClose className='mt-auto mb-auto text-lg' /></button>
                        </div>
                      ))
                      : ''
                  }
                </div>
                <div className='flex gap-2 justify-between'>
                  <p>Total</p>
                  <p>${NumberFormat(sell.cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0))}</p>
                </div>
              </div>
            </div>
            <div className='flex gap-4 flex-col w-1/3'>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Envío</h2>
                {
                  sell.city !== ''
                    ? (
                      <>
                        <div className='mb-4'>
                          <h3 className='mb-2 text-sm'>Metodo de envío</h3>
                          <select onChange={inputChange} name='shippingMethod' className='font-light p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                            <option>Seleccionar metodo de envío</option>
                            <option>Chilexpress</option>
                          </select>
                        </div>
                        <div>
                          <h3 className='mb-2 text-sm'>Estado del envío</h3>
                          <select onChange={inputChange} name='shippingState' className='font-light p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                            <option>Seleccionar estado del envío</option>
                            <option>No empaquetado</option>
                            <option>Productos empaquetados</option>
                            <option>Envío realizado</option>
                          </select>
                        </div>
                      </>
                    )
                    : <p className='text-sm'>Ingresa la región y ciudad para ver las opciones de envíos</p>
                }
                {
                  chilexpress.length
                    ? sell.shippingMethod === 'Chilexpress'
                      ? (
                        <div className='mt-4 flex flex-col gap-2'>
                          {
                            chilexpress.map((service: any) => (
                              <div className='flex gap-2 justify-between' key={service.serviceDescription}>
                                <div className='flex gap-2'>
                                  <input type='radio' name='shipping' onClick={() => setSell({...sell, shipping: service.serviceValue, total: Number(sell.cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0)) + Number(service.serviceValue)})} />
                                  <p className='text-sm'>{service.serviceDescription}</p>
                                </div>
                                <p className='text-sm'>${NumberFormat(service.serviceValue)}</p>
                              </div>
                            ))
                          }
                        </div>
                      )
                      : ''
                    : ''
                }
              </div>
              <div className='bg-white border border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Pago</h2>
                {
                  sell.shippingMethod
                    ? (
                      <>
                        <div className='mb-4'>
                          <h3 className='mb-2 text-sm'>Metodo de pago</h3>
                          <select onChange={inputChange} name='pay' className='font-light p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                            <option>Seleccionar metodo de pago</option>
                            <option>WebPay Plus</option>
                          </select>
                        </div>
                        <div>
                          <h3 className='mb-2 text-sm'>Estado del pago</h3>
                          <select onChange={inputChange} name='state' className='font-light p-1.5 w-full rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                            <option>Seleccionar estado del pago</option>
                            <option>Pago no realizado</option>
                            <option>Pago iniciado</option>
                            <option>Pago rechazado</option>
                            <option>Pago realizado</option>
                          </select>
                        </div>
                      </>
                    )
                    : <p className='text-sm'>Ingresa los datos de envío para ver las opciones de pago</p>
                }
              </div>
            </div>
          </form>
        </div>
    </>
  )
}

export default NewSell