import { LeftMenu, NewCategoryModal, Spinner, Spinner2 } from '@/components/ui'
import { IProduct } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import Link from 'next/link'
import Head from 'next/head'
import { ICategory } from '../../interfaces'
import { CategoryProduct, Media, NameDescription, Price, ProductOffer, ProductSeo, StockVariations, Visibility } from '@/components/product'
import { IProductsOffer } from '../../interfaces/products'
import axios from 'axios'
import { useRouter } from 'next/router'
import { IoCloseOutline } from 'react-icons/io5'

const ProductPage = () => {

  const [information, setInformation] = useState<IProduct>()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState('hidden')
  const [newCategoryData, setNewCategoryData] = useState<ICategory>({
    category: '',
    description: '',
    slug: ''
  })
  const [productsOffer, setProductsOffer] = useState<IProductsOffer[]>([{productsSale: [], price: 0}])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [quantityOffers, setQuantityOffers] = useState([{
    quantity: undefined,
    descount: undefined
  }])
  const [popupView, setPopupView] = useState('hidden')
  const [popupMouse, setPopupMouse] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getProduct = async () => {
    const slug = router.asPath.replace('/productos/', '')
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`)
    setInformation({
      _id: data._id,
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      beforePrice: data.beforePrice,
      cost: data.cost,
      images: data.images,
      stock: data.stock,
      slug: data.slug,
      variations: data.variations.variations.length ? data.variations : { nameVariation: '', variations: [{ variation: '', stock: 0 }] },
      state: data.state,
      sku: data.sku,
      tags: data.tags,
      titleSeo: data.titleSeo,
      descriptionSeo: data.descriptionSeo
    })
    setProductsOffer(data.productsOffer?.length ? data.productsOffer : [{productsSale: [], price: 0}])
    setQuantityOffers(data.quantityOffers?.length ? data.quantityOffers : [{
      quantity: undefined,
      descount: undefined
    }])
  }

  const getCategories = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    setCategories(data)
  }

  useEffect(() => {
    getProduct()
    getCategories()
  }, [])

  const handleSubmit = async () => {
    setSubmitLoading(true)
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${information?._id}`, { name: information?.name, description: information?.description, category: information?.category, price: information?.price, beforePrice: information?.beforePrice, images: information?.images, stock: information?.stock, slug: information?.slug, state: information?.state, tags: information?.tags, titleSeo: information?.titleSeo, descriptionSeo: information?.descriptionSeo, variations: information?.variations, productsOffer: productsOffer, cost: information?.cost, quantityOffers: quantityOffers })
    router.push('/productos')
  }

  const deleteProduct = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${information?._id}`)
    router.push('/productos')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>{information?.name}</title>
      </Head>
        <div onClick={() => !popupMouse ? setPopupView('hidden') : ''} className={`${popupView} right-0 fixed flex bg-black/20 dark:bg-black/40`} style={{ width: 'calc(100% - 70px)', height: 'calc(100vh - 56px)' }}>
          <div onMouseEnter={() => setPopupMouse(true)} onMouseLeave={() => setPopupMouse(false)} className='w-[500px] p-6 flex flex-col gap-2 rounded-md shadow-md bg-white m-auto'>
            <p>Estas seguro que deseas eliminar el producto <strong>{information?.name}</strong></p>
            <div className='flex gap-6'>
              <button onClick={deleteProduct} className='bg-red-500 h-10 w-36 rounded-md text-white'>{loading ? <Spinner2 /> : 'Eliminar'}</button>
              <button onClick={() => setPopupView('hidden')}>Cancelar</button>
            </div>
          </div>
        </div>
        <div className='fixed flex bg-white border-t bottom-0 right-0 p-4 dark:bg-neutral-800 dark:border-neutral-700' style={{ width: 'calc(100% - 70px)' }}>
          <div className='flex m-auto w-1280'>
            <div className='flex gap-2 ml-auto w-fit'>
              <button onClick={handleSubmit} className='bg-main text-white text-sm rounded-md w-40 h-8'>{submitLoading ? <Spinner2 /> : 'Modificar producto'}</button>
              <Link className='bg-red-600 pt-1.5 pb-1.5 text-white text-sm rounded-md pl-4 pr-4' href='/productos'>Descartar</Link>
            </div>
          </div>
        </div>
        <NewCategoryModal setCategories={setCategories} newCategory={newCategory} newCategoryData={newCategoryData} setNewCategory={setNewCategory} setNewCategoryData={setNewCategoryData} />
        <div className='p-6 bg-[#f6f6f7] mb-16 overflow-y-scroll dark:bg-neutral-900' style={{ width: 'calc(100% - 70px)' }}>
          {
            information
              ? (
                <>
                  <div className='flex gap-3 mb-4 max-w-1280 m-auto'>
                    <Link href='/productos' className='border rounded p-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600'><BiArrowBack className='text-xl' /></Link>
                    <h1 className='text-xl mt-auto mb-auto'>{ information.name }</h1>
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
                      <Visibility setInformation={setInformation} information={information} />
                      <Price information={information} setInformation={setInformation} />
                      <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
                        <div>
                          <h2 className='mb-4'>Descuentos por cantidad</h2>
                          <table>
                            <thead>
                              <tr>
                                <th className='font-normal text-sm text-left'>Cantidad</th>
                                <th className='font-normal text-sm text-left'>Descuento</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                quantityOffers.map((offer, index) => (
                                  <tr key={index}>
                                    <td><input type='number' placeholder='Cantidad' onChange={(e: any) => {
                                      const quantity = quantityOffers
                                      quantity[index].quantity = e.target.value
                                      setQuantityOffers(quantity)
                                    }} value={offer.quantity} className='font-light w-[120px] p-1.5 rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' /></td>
                                    <td><input type='number' placeholder='%' onChange={(e: any) => {
                                      const quantity = quantityOffers
                                      quantity[index].descount = e.target.value
                                      setQuantityOffers(quantity)
                                    }} value={offer.descount} className='font-light p-1.5 w-[120px] rounded border text-sm focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600' /></td>
                                    <td><button><IoCloseOutline className='text-xl' /></button></td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                          <button onClick={(e: any) => {
                            e.preventDefault()
                            setQuantityOffers(quantityOffers.concat({
                              quantity: undefined,
                              descount: undefined
                            }))
                          }} className='bg-main mt-2 text-white text-sm rounded-md w-36 h-8'>Agregar fila</button>
                        </div>
                      </div>
                      <CategoryProduct categories={categories} information={information} setInformation={setInformation} setNewCategory={setNewCategory} />
                      <div className='bg-white p-4 rounded-md shadow border border-white dark:bg-neutral-800 dark:border-neutral-700'>
                        <h2 className='mb-4'>Eliminar producto</h2>
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

export default ProductPage