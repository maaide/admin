import { LeftMenu, Spinner, Spinner2 } from '@/components/ui'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { ICategory } from '../../../interfaces/categories'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { NameDescription, CategorySeo, Media } from '@/components/categories'

const CategoryPage = () => {

  const [categoryInfo, setCategoryInfo] = useState<ICategory>()
  const [updatingLoading, setUpdatingLoading] = useState(false)
  const [popupView, setPopupView] = useState('hidden')
  const [popupMouse, setPopupMouse] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getCategory = async () => {
    const slug = router.asPath.replace('/productos/categorias/', '')
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`)
    setCategoryInfo(data)
  }

  useEffect(() => {
    getCategory()
  }, [])

  const handleSubmit = async () => {
    setUpdatingLoading(true)
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryInfo?._id}`, categoryInfo)
    router.push('/productos/categorias')
  }

  const deleteCategory = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryInfo?._id}`)
    router.push('/productos/categorias')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>{categoryInfo?.category}</title>
      </Head>
        <div onClick={() => !popupMouse ? setPopupView('hidden') : ''} className={`${popupView} right-0 fixed flex bg-black/20 dark:bg-black/40`} style={{ width: 'calc(100% - 70px)', height: 'calc(100vh - 56px)' }}>
          <div onMouseEnter={() => setPopupMouse(true)} onMouseLeave={() => setPopupMouse(false)} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar la categoria <strong>{categoryInfo?.category}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteCategory} className='bg-red-500 h-10 w-36 rounded-md text-white'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => setPopupView('hidden')}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-40 h-8'>{updatingLoading ? <Spinner2 /> : 'Modificar categoría'}</button>
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos/categorias'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] mb-16 overflow-y-scroll dark:bg-neutral-900' style={{ width: 'calc(100% - 70px)' }}>
          {
            categoryInfo
              ? (
                <>
                  <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
                    <Link href='/productos/categorias' className='border rounded p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-xl mt-auto mb-auto'>{ categoryInfo.category }</h1>
                  </div>
                  <form className='flex gap-4 max-w-1280 m-auto'>
                    <div className='flex gap-4 flex-col w-2/3'>
                      <NameDescription categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
                      <CategorySeo categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
                    </div>
                    <div className='flex gap-4 flex-col w-1/3'>
                      <Media categoryInfo={categoryInfo} setCategoryInfo={setCategoryInfo} />
                      <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4'>Eliminar categoria</h2>
                        <button onClick={async (e: any) => {
                          e.preventDefault()
                          setPopupView('flex')
                        }} className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md w-20'>Eliminar</button>
                      </div>
                    </div>
                  </form>
                </>
              )
              : (
                <div className="flex w-full mt-32">
                  <div className="m-auto mt-16 mb-16">
                    <Spinner />
                  </div>
                </div>
              )
          }
        </div>
    </>
  )
}

export default CategoryPage