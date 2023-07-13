import { CategoryProduct, Media, NameDescription, Price, ProductOffer, ProductSeo, StockVariations, Visibility } from '@/components/product'
import { LeftMenu, NewCategoryModal, Spinner2 } from '@/components/ui'
import { dbCategories } from '@/database'
import { ICategory, IProduct, IProductsOffer } from '@/interfaces'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface Props {
  categories: ICategory[]
}

const NewProduct: React.FC<Props> = ({ categories }) => {

  const [information, setInformation] = useState<IProduct>({
    name: '',
    description: '',
    category: '',
    price: 0,
    images: [],
    stock: 0,
    slug: '',
    state: false,
    tags: [],
    titleSeo: '',
    descriptionSeo: '',
    variations: [{ variation: '', stock: 0, sku: '', image: '' }],
    nameVariations: ''
  })

  const initial = {
    name: ''
  }

  const [newCategory, setNewCategory] = useState('hidden')
  const [newCategoryData, setNewCategoryData] = useState<ICategory>({
    category: '',
    description: '',
    slug: ''
  })
  const [productsOffer, setProductsOffer] = useState<IProductsOffer[]>([{productsSale: [], price: 0}])
  const [submitLoading, setSubmitLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.post(`${process.env.API_URL}/products`, { name: information.name, description: information.description, category: information.category, price: information.price, beforePrice: information.beforePrice, images: information.images, stock: information.stock, slug: information.slug, state: information.state, tags: information.tags, titleSeo: information.titleSeo, descriptionSeo: information.descriptionSeo, variations: information.variations, nameVariations: information.nameVariations, productsOffer: productsOffer, cost: information.cost })
    router.push('/productos')
  }

  return (
    <>
      <Head>
        <title>Nuevo Producto</title>
      </Head>
      <LeftMenu>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 256px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              {
                information.name === initial.name
                  ? <button onClick={(e: any) => e.preventDefault()} className='bg-main/50 cursor-not-allowed pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4'>Crear producto</button>
                  : <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-36 h-8'>{submitLoading ? <Spinner2 /> : 'Crear producto'}</button>
              }
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <NewCategoryModal newCategory={newCategory} newCategoryData={newCategoryData} setNewCategory={setNewCategory} setNewCategoryData={setNewCategoryData} />
        <div className='p-6 bg-[#f6f6f7] mb-16 overflow-y-scroll dark:bg-neutral-900' style={{ width: 'calc(100% - 252px)' }}>
          <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
            <Link href='/productos' className='border rounded p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600'><BiArrowBack className='text-xl' /></Link>
            <h1 className='text-xl mt-auto mb-auto'>Nuevo Producto</h1>
          </div>
          <form className='flex gap-4 max-w-1280 m-auto'>
            <div className='flex gap-4 flex-col w-2/3'>
              <NameDescription information={information} setInformation={setInformation} />
              <Media information={information} setInformation={setInformation} />
              <StockVariations information={information} setInformation={setInformation} />
              <ProductOffer productsOffer={productsOffer} setProductsOffer={setProductsOffer} />
              <ProductSeo information={information} setInformation={setInformation} />
            </div>
            <div className='w-1/3 flex flex-col gap-4'>
              <Visibility information={information} setInformation={setInformation} />
              <Price information={information} setInformation={setInformation} />
              <CategoryProduct categories={categories} information={information} setInformation={setInformation} setNewCategory={setNewCategory} />
            </div>
          </form>
        </div>
      </LeftMenu>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = await dbCategories.getAllCategoriesForProducts()
  return {
    props: {
      categories
    }
  }
}

export default NewProduct