import { Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

const PersonalizePage = () => {

  const [part, setPart] = useState('')
  const [bannerView, setBannerView] = useState(false)
  const [categoryView, setCategoryView] = useState(false)
  const [productsView, setProductsView] = useState(false)
  const [design, setDesign] = useState({
    header: {
      topStrip: ''
    },
    home: {
      banner: [{
        image: '',
        title: '',
        text: '',
        textButton: '',
        linkButton: ''
      }],
      category: {
        titleCategory: false,
        descriptionCategory: false
      },
      products: {
        title: '',
        sectionProducts: 'Todos los productos'
      }
    },
    product: {
      sectionProducts: 'Todos los productos'
    },
    contact: {
      title: '',
      text: '',
      titleForm: ''
    },
    shop: {
      title: '',
      description: '',
      banner: ''
    },
    subscription: {
      title: ''
    }
  })

  const [loading, setLoading] = useState(false)

  const getDesign = async () => {
    const response = await axios.get('https://server-production-e234.up.railway.app/design')
    if (response.data) {
      setDesign(response.data)
    }
  }

  useEffect(() => {
    getDesign()
  }, [])

  const imageChange = async (e: any) => {
    const { data } = await axios.post('https://server-production-e234.up.railway.app/product-image-upload', { image: e.target.files[0] }, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    const updatedDesign = {...design}
    updatedDesign.shop.banner = data.image.url
    setDesign(updatedDesign)
  }
  
  const handleSubmit = async () => {
    setLoading(true)
    await axios.post('https://server-production-e234.up.railway.app/design', design)
    setLoading(false)
    window.location.reload()
  }

  return (
    <>
      <Head>
        <title>Personalizar sitio web</title>
      </Head>
      <div className='fixed flex w-full' style={{ height: 'calc(100% - 56px)' }}>
        <div className='w-[500px] border-r pt-6 pb-6 pl-4 pr-4 flex flex-col justify-between dark:border-neutral-800' style={{ overflow: 'overlay' }}>
          {
            part === ''
              ? (
                <div className='flex flex-col gap-2'>
                  <div className='border-b pb-4 dark:border-neutral-700'>
                    <Link href='/diseno' className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></Link>
                  </div>
                  <button onClick={() => setPart('Encabezado')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Encabezado</p></button>
                  <button onClick={() => setPart('Inicio')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Pagina de inicio</p></button>
                  <button onClick={() => setPart('Producto')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Pagina de producto</p></button>
                  <button onClick={() => setPart('Contacto')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Pagina de contacto</p></button>
                  <button onClick={() => setPart('Tienda')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Tienda</p></button>
                  <button onClick={() => setPart('Suscripcion')} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><p className='my-auto'>Zona de suscripción</p></button>
                </div>
              )
              : ''
          }
          {
            part === 'Encabezado'
              ? (
                <div className='flex flex-col gap-4'>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    setPart('')
                  }} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  <p className='text-lg border-b pb-2 dark:border-neutral-700'>Encabezado</p>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Franja superior</p>
                    <input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const updatedDesign = {...design}
                      updatedDesign.header.topStrip = e.target.value
                      setDesign(updatedDesign)
                    }} value={design.header.topStrip} placeholder='Franja superior' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Inicio'
              ? (
                <div className='flex flex-col gap-4'>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    setPart('')
                  }} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  <p className='text-lg border-b pb-2 dark:border-neutral-700'>Inicio</p>
                  <button onClick={() => bannerView ? setBannerView(false) : setBannerView(true)} className='w-full flex gap-2 justify-between'>
                    <h2>Banner</h2>
                  </button>
                  {
                    bannerView
                      ? (
                        <div className='flex flex-col gap-4'>
                          {
                            design.home.banner.map((banner, index) => (
                              <div key={index} className='flex flex-col gap-2'>
                                <p>Banner {index + 1}</p>
                                <p className='text-sm'>Imagen de fondo</p>
                                <input type='file' onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                                  const response = await axios.post('https://server-production-e234.up.railway.app/product-image-upload', {image: e.target.files?.length ? e.target.files[0] : ''}, {
                                    headers: {
                                      accept: 'application/json',
                                      'Accept-Language': 'en-US,en;q=0.8',
                                      'Content-Type': 'multipart/form-data'
                                    }
                                  })
                                  const updatedHome = {...design}
                                  updatedHome.home.banner[index].image = response.data.image.url
                                  setDesign(updatedHome)
                                }} className='text-sm' />
                                <p className='text-sm'>Titulo</p>
                                <input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                  const updatedHome = {...design}
                                  updatedHome.home.banner[index].title = e.target.value
                                  setDesign(updatedHome)
                                }} value={banner.title} placeholder='Titulo' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                <p className='text-sm'>Texto</p>
                                <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                  const updatedHome = {...design}
                                  updatedHome.home.banner[index].text = e.target.value
                                  setDesign(updatedHome)
                                }} value={banner.text} placeholder='Texto' className='font-light h-20 p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                <p className='text-sm'>Texto boton</p>
                                <input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                  const updatedHome = {...design}
                                  updatedHome.home.banner[index].textButton = e.target.value
                                  setDesign(updatedHome)
                                }} value={banner.textButton} placeholder='Texto' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                                <p className='text-sm'>Link boton</p>
                                <input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                  const updatedHome = {...design}
                                  updatedHome.home.banner[index].linkButton = e.target.value
                                  setDesign(updatedHome)
                                }} value={banner.linkButton} placeholder='Link' className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                              </div>
                            ))
                          }
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            const updatedHome = {...design}
                            updatedHome.home.banner.push({
                              image: '',
                              title: '',
                              text: '',
                              textButton: '',
                              linkButton: ''
                            })
                            setDesign(updatedHome)
                          }} className='bg-main text-white text-sm rounded-md w-36 h-8'>Agregar Banner</button>
                        </div>
                      )
                      : ''
                  }
                  <button onClick={() => categoryView ? setCategoryView(false) : setCategoryView(true)} className='w-full flex gap-2 justify-between'>
                    <h2>Categorias</h2>
                  </button>
                  {
                    categoryView
                      ? (
                        <div className='flex flex-col gap-2'>
                          <div className='flex gap-2'>
                            <input type='checkbox' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const updatedDesign = {...design}
                              updatedDesign.home.category.titleCategory = e.target.checked ? true : false
                              setDesign(updatedDesign)
                            }} />
                            <p className='text-sm'>Mostrar titulo categorias</p>
                          </div>
                          <div className='flex gap-2'>
                            <input type='checkbox' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const updatedDesign = {...design}
                              updatedDesign.home.category.descriptionCategory = e.target.checked ? true : false
                              setDesign(updatedDesign)
                            }} />
                            <p className='text-sm'>Mostrar descripción de la categoria</p>
                          </div>
                        </div>
                      )
                      : ''
                  }
                  <button onClick={() => productsView ? setProductsView(false) : setProductsView(true)} className='w-full flex gap-2 justify-between'>
                    <h2>Productos</h2>
                  </button>
                  {
                    productsView
                      ? (
                        <div className='flex flex-col gap-4'>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Titulo</p>
                            <input type='text' placeholder='Titulo' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const updatedDesign = {...design}
                              updatedDesign.home.products.title = e.target.value
                              setDesign(updatedDesign)
                            }} value={design.home.products.title} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <p className='text-sm'>Sección de productos</p>
                            <select onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                              const updatedDesign = {...design}
                              updatedDesign.home.products.sectionProducts = e.target.value
                              setDesign(updatedDesign)
                            }} className='p-1.5 mb-2 rounded border text-sm font-light focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                              <option>Todos los productos</option>
                              <option>Productos en oferta</option>
                              <option>Productos de una categoria</option>
                            </select>
                          </div>
                        </div>
                      )
                      : ''
                  }
                </div>
              )
              : ''
          }
          {
            part === 'Producto'
              ? (
                <div className='flex flex-col gap-4'>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    setPart('')
                  }} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  <p className='text-lg border-b pb-2 dark:border-neutral-700'>Pagina de producto</p>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Sección de productos</p>
                    <select onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      const updatedDesign = {...design}
                      updatedDesign.product.sectionProducts = e.target.value
                      setDesign(updatedDesign)
                    }} className='p-1.5 mb-2 rounded border text-sm font-light focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                      <option>Todos los productos</option>
                      <option>Productos en oferta</option>
                      <option>Productos de una categoria</option>
                    </select>
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Contacto'
              ? (
                <div className='flex flex-col gap-4'>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    setPart('')
                  }} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  <p className='text-lg border-b pb-2 dark:border-neutral-700'>Pagina de contacto</p>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Titulo</p>
                    <input type='text' placeholder='Titulo' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const updatedDesign = {...design}
                      updatedDesign.contact.title = e.target.value
                      setDesign(updatedDesign)
                    }} value={design.contact.title} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Texto</p>
                    <input type='text' placeholder='Texto' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const updatedDesign = {...design}
                      updatedDesign.contact.text = e.target.value
                      setDesign(updatedDesign)
                    }} value={design.contact.text} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Titulo formulario</p>
                    <input type='text' placeholder='Titulo formulario' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const updatedDesign = {...design}
                      updatedDesign.contact.titleForm = e.target.value
                      setDesign(updatedDesign)
                    }} value={design.contact.titleForm} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Tienda'
              ? (
                <div className='flex flex-col gap-4'>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    setPart('')
                  }} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  <p className='text-lg border-b pb-2 dark:border-neutral-700'>Tienda</p>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Titulo</p>
                    <input type='text' placeholder='Titulo' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const updatedDesign = {...design}
                      updatedDesign.shop.title = e.target.value
                      setDesign(updatedDesign)
                    }} value={design.shop.title} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Descripción</p>
                    <input type='text' placeholder='Descripción' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const updatedDesign = {...design}
                      updatedDesign.shop.description = e.target.value
                      setDesign(updatedDesign)
                    }} value={design.shop.description}  className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Banner</p>
                    <input type='file' onChange={imageChange} className='font-light text-sm block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-main/10 file:text-main hover:file:bg-main/20' />
                  </div>
                </div>
              )
              : ''
          }
          {
            part === 'Suscripcion'
              ? (
                <div className='flex flex-col gap-4'>
                  <button onClick={(e: any) => {
                    e.preventDefault()
                    setPart('')
                  }} className='font-light flex gap-2 pt-1 pb-1 pl-2 pr-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800'><BiArrowBack className='text-xl my-auto' /><p className='my-auto'>Volver</p></button>
                  <p className='text-lg border-b pb-2 dark:border-neutral-700'>Zona de suscripción</p>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>Titulo</p>
                    <input type='text' placeholder='Titulo' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const updatedDesign = {...design}
                      updatedDesign.subscription.title = e.target.value
                      setDesign(updatedDesign)
                    }} value={design.subscription.title} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                  </div>
                </div>
              )
              : ''
          }
          <div className='flex flex-col gap-2'>
            <button onClick={handleSubmit} className='w-full bg-main text-white h-10 rounded-md'>{loading ? <Spinner2 /> : 'Guardar'}</button>
            <Link className='w-full flex' href='/diseno'><p className='m-auto'>Descartar</p></Link>
          </div>
        </div>
        {
          part === 'Inicio' || part === 'Encabezado' || part === 'Suscripcion' || part === '' || part === 'Footer'
            ? <iframe className='m-auto bg-white' src="https://tienda-1.vercel.app" width="100%" height="100%" />
            : ''
        }
        {
          part === 'Producto'
            ? <iframe className='m-auto bg-white' src="https://tienda-1.vercel.app/productos/airpods-pro" width="100%" height="100%" />
            : ''
        }
        {
          part === 'Contacto'
            ? <iframe className='m-auto bg-white' src="https://tienda-1.vercel.app/contacto" width="100%" height="100%" />
            : ''
        }
        {
          part === 'Tienda'
            ? <iframe className='m-auto bg-white' src="https://tienda-1.vercel.app/tienda" width="100%" height="100%" />
            : ''
        }
      </div>
    </>
  )
}

export default PersonalizePage