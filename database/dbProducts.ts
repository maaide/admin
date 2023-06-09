import { db } from "."
import { IProduct } from "../interfaces"
import { Product } from '../models'

export const getProductBySlug = async ( slug: string ): Promise<IProduct | null> => {
  await db.dbConnect()
  const product = await Product.findOne({ slug }).lean()

  if ( !product ) {
    return null
  }

  product.images = product.images.map( image => {
    return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
  })

  return JSON.parse( JSON.stringify( product ) )
}

interface ProductSlug {
  slug: string
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.dbConnect()
  const slugs = await Product.find().select('slug -_id').lean()

  return slugs
}

export const getProductsByTerm = async ( term: string ): Promise<IProduct[]> => {
  term = term.toString().toLowerCase()

  await db.dbConnect()
  const products = await Product.find({
    $text: { $search: term }
  })
  .select('name images price offerPrice stock slug -_id')
  .lean()

  return products
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.dbConnect()
  const products = await Product.find().lean()

  return JSON.parse( JSON.stringify( products ) )
}
