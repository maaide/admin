import { LeftMenu, Spinner, Spinner2 } from '@/components/ui'
import { IPost } from '@/interfaces'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const BlogPage = () => {

  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState(false)
  const [popupView, setPopupView] = useState('hidden')
  const [popupMouse, setPopupMouse] = useState(false)
  const [postSelect, setPostSelect] = useState({
    _id: '',
    title: ''
  })
  
  const router = useRouter()

  const getPosts = async () => {
    setLoading(true)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
    if (response.data) {
      setPosts(response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])

  const deleteProduct = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postSelect._id}`)
    router.reload()
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <LeftMenu>
        <div onClick={() => !popupMouse ? setPopupView('hidden') : ''} className={`${popupView} right-0 fixed flex bg-black/20 dark:bg-black/40`} style={{ width: 'calc(100% - 256px)', height: 'calc(100vh - 56px)' }}>
          <div onMouseEnter={() => setPopupMouse(true)} onMouseLeave={() => setPopupMouse(false)} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar el post <strong>{postSelect.title}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteProduct} className='bg-red-500 h-10 w-36 rounded-md text-white'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => setPopupView('hidden')}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)', overflow: 'overlay' }}>
          <div className='flex justify-between w-full max-w-1280 m-auto mb-4'>
            <h1 className='text-xl'>Blog</h1>
            <Link className='pt-1.5 pb-1.5 h-fit pl-7 pr-7 rounded-md bg-main text-white' href='/blog/nuevo-post'>Agregar post</Link>
          </div>
          <div className='w-full max-w-1280 m-auto'>
            {
              loading
                ? (
                  <div className="flex w-full">
                    <div className="m-auto mt-16 mb-16">
                      <Spinner />
                    </div>
                  </div>
                )
                : posts.length
                  ? (
                    <table className='shadow-md w-full border dark:border-neutral-600'>
                      <thead className='bg-white border-b w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        <tr>
                          <th className='text-left p-2 font-normal'>Imagen</th>
                          <th className='text-left p-2 font-normal'>Titulo</th>
                          <th className='text-left p-2 font-normal'>Estado</th>
                          <th className='text-left p-2 font-normal'>Fecha</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className='bg-white w-full dark:bg-neutral-800 dark:border-neutral-600'>
                        {
                          posts.map(post => (
                            <tr className='border-b cursor-pointer w-full dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700' key={post._id}>
                              <td className='p-2 w-3/12' onClick={() => router.push(`/blog/${post._id}`)}>
                                <img className='w-20' src={post.image.url} />
                              </td>
                              <td className='p-2 w-4/12' onClick={() => router.push(`/blog/${post._id}`)}>
                                <p className='font-light'>{post.title}</p>
                              </td>
                              <td className='p-2 w-2/12' onClick={() => router.push(`/blog/${post._id}`)}>
                                {
                                  post.state === true
                                    ? <p className='font-light w-fit pt-1 pb-1 pl-2 pr-2 bg-green-500 rounded-md text-white'>Activo</p>
                                    : <p className='font-light w-fit pt-1 pb-1 pl-2 pr-2 bg-red-500 rounded-md text-white'>Borrador</p>
                                }
                              </td>
                              <td className='p-2 w-2/12' onClick={() => router.push(`/blog/${post._id}`)}>
                                <p className='font-light'>{new Date(post.createdAt!).toLocaleDateString()}</p>
                              </td>
                              <td className='p-2 w-1/12'>
                                <button onClick={async(e: any) => {
                                  e.preventDefault()
                                  setPopupView('flex')
                                  setPostSelect({ _id: post._id!, title: post.title })
                                }}><AiOutlineClose /></button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
                  : 'No hay posts'
            }
          </div>
        </div>
      </LeftMenu>
    </>
  )
}

export default BlogPage