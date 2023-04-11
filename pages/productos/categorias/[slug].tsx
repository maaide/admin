import { LeftMenu, Spinner2 } from '@/components/ui'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { ICategory } from '../../../interfaces/categories'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { NameDescription, CategorySeo, Media } from '@/components/categories'

const CategoryPage = () => {

  const [categoryInfo, setCategoryInfo] = useState<ICategory>({
    category: '',
    description: '',
    slug: ''
  })
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [updatingLoading, setUpdatingLoading] = useState(false)

  const router = useRouter()

  const getCategory = async () => {
    const slug = router.asPath.replace('/productos/categorias/', '')
    const { data } = await axios.get(`https://server-production-e234.up.railway.app/categories/${slug}`)
    setCategoryInfo(data)
  }

  useEffect(() => {
    getCategory()
  }, [])

  const handleSubmit = async () => {
    setUpdatingLoading(true)
    await axios.put(`https://server-production-e234.up.railway.app/categories/${categoryInfo._id}`, categoryInfo)
    router.push('/productos/categorias')
  }

  return (
    <>
      <Head>
        <title>{categoryInfo.category}</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-40 h-8'>{updatingLoading ? <Spinner2 /> : 'Modificar categoría'}</button>
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos/categorias'>Descartar</Link>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#f6f6f7] mb-16 overflow-y-scroll dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)' }}>
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
                  setDeleteLoading(true)
                  await axios.delete(`https://server-production-e234.up.railway.app/categories/${categoryInfo._id}`)
                  router.push('/categorias')
                }} className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md w-20'>{deleteLoading ? <Spinner2 /> : 'Eliminar'}</button>
              </div>
            </div>
          </form>
        </div>
      </LeftMenu>
    </>
  )
}

export default CategoryPage