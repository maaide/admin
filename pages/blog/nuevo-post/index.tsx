import { LeftMenu, Spinner2 } from '@/components/ui'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

const BlogPage = () => {

  const [contentData, setContentData] = useState({
    title: '',
    content: [{
      type: 'Texto',
      html: 'H1',
      content: '',
      image: { public_id: '', url: '' }
    }],
    state: false,
    image: { public_id: '', url: '' },
    titleSeo: '',
    descriptionSeo: ''
  })
  const [submitLoading, setSubmitLoading] = useState(false)

  const router = useRouter()

  const imageChange = async (e: any) => {
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, { image: e.target.files[0] }, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data'
      }
    })
    setContentData({...contentData, image: { public_id: data.image.public_id, url: data.image.url }})
  }

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, contentData)
    router.push('/blog')
    setSubmitLoading(false)
  }

  return (
    <>
      <Head>
        <title>Nuevo post</title>
      </Head>
      <LeftMenu>
       <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-28 h-8'>{submitLoading ? <Spinner2 /> : 'Crear post'}</button>
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/blog'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex gap-2 w-full max-w-1280 m-auto mb-4'>
            <Link href='/blog' className='border rounded p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl my-auto'>Nuevo post</h1>
          </div>
          <form onSubmit={handleSubmit} className='flex gap-4 max-w-1280 m-auto'>
            <div className='flex gap-4 flex-col w-2/3'>
              <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <div className='flex flex-col gap-2'>
                  <h2>Titulo</h2>
                  <input type='text' placeholder='Titulo del post' onChange={(e: any) => setContentData({ ...contentData, title: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex flex-col gap-2'>
                  <h2>Contenido</h2>
                  {
                    contentData.content.map((content, index) => (
                      <div key={index} className='flex gap-2'>
                        <select value={content.type} onChange={(e: any) => {
                          let mod: any = contentData.content
                          mod[index].type = e.target.value
                          setContentData({ ...contentData, content: mod })
                        }} className='p-1.5 rounded border text-sm font-light focus:outline-none h-fit my-auto focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                          <option>Texto</option>
                          <option>Imagen</option>
                        </select>
                        {
                          content.type === 'Texto'
                            ? (
                              <select value={content.html} onChange={(e: any) => {
                                let mod: any = contentData.content
                                mod[index].html = e.target.value
                                setContentData({ ...contentData, content: mod })
                              }} className='p-1.5 rounded border text-sm font-light focus:outline-none h-fit my-auto focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                                <option>H1</option>
                                <option>H2</option>
                                <option>H3</option>
                                <option>H4</option>
                                <option>H5</option>
                                <option>Parrafo</option>
                              </select>
                            )
                            : ''
                        }
                        {
                          content.type === 'Imagen'
                            ? (
                              <input type='file' onChange={async (e: any) => {
                                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product-image-upload`, { image: e.target.files[0] }, {
                                  headers: {
                                    accept: 'application/json',
                                    'Accept-Language': 'en-US,en;q=0.8',
                                    'Content-Type': 'multipart/form-data'
                                  }
                                })
                                let mod = contentData.content
                                mod[index].image = { public_id: data.image.public_id, url: data.image.url }
                                setContentData({ ...contentData, content: mod })
                              }} className='text-sm m-auto' />
                            )
                            : content.html === 'Parrafo'
                              ? (
                                <textarea placeholder='Contenido' value={content.content} onChange={(e: any) => {
                                  let mod: any = contentData.content
                                  mod[index].content = e.target.value
                                  setContentData({ ...contentData, content: mod })
                                }} className='font-light p-1.5 rounded border text-sm w-full h-56 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                              )
                              : (
                                <input type='text' placeholder='Contenido' value={content.content} onChange={(e: any) => {
                                  let mod: any = contentData.content
                                  mod[index].content = e.target.value
                                  setContentData({ ...contentData, content: mod })
                                }} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                              )
                        }
                      </div>
                    ))
                  }
                </div>
                <button onClick={(e: any) => {
                  e.preventDefault()
                  setContentData({ ...contentData, content: contentData.content.concat({ type: 'Texto', html: 'H1', content: '', image: { public_id: '', url: '' } }) })
                }} className='py-2 px-8 bg-main text-sm text-white m-auto rounded-md'>Agregar contenido</button>
              </div>
              <div className='bg-white border flex flex-col gap-4 border-white p-4 rounded-md shadow dark:bg-neutral-800 dark:border-neutral-700'>
                <h2>SEO</h2>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-sm'>Meta titulo</h3>
                  <input type='text' placeholder='Meta titulo' onChange={(e: any) => setContentData({ ...contentData, titleSeo: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-sm'>Meta descripción</h3>
                  <textarea placeholder='Meta descripción' onChange={(e: any) => setContentData({ ...contentData, descriptionSeo: e.target.value })} className='font-light p-1.5 rounded border text-sm w-full h-32 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' />
                </div>
              </div>
            </div>
            <div className='w-1/3 flex flex-col gap-4'>
              <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
                <h2 className='mb-4'>Visibilidad del producto</h2>
                <select onChange={(e: any) => {
                  setContentData({...contentData, state: e.target.value === 'Activo' ? true : false})
                }} value={contentData.state ? 'Activo' : 'En borrador'} className='p-1.5 mb-2 rounded border text-sm font-light focus:outline-none w-full focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600'>
                  <option>Activo</option>
                  <option>En borrador</option>
                </select>
              </div>
              <div className='bg-white p-4 rounded-md shadow border flex flex-col gap-4 border-white dark:bg-neutral-800 dark:border-neutral-700'>
                <h2>Imagen principal</h2>
                <input type='file' className='text-sm' onChange={imageChange} />
                {
                  contentData.image.url !== ''
                    ? <img src={contentData.image.url} />
                    : ''
                }
              </div>
            </div>
          </form>
        </div>
      </LeftMenu>
    </>
  )
}

export default BlogPage