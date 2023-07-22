import { db } from "."
import { ICategory } from "../interfaces"
import { Category } from '../models'

interface CategorySlug {
  slug: string
}

export const getAllcategoriesSlug = async (): Promise<CategorySlug[]> => {
  await db.connectDB()
  const slugs = await Category.find().select('slug -_id').lean()

  return slugs
}

export const getCategoriesBySlug = async (slug: string): Promise<ICategory | null> => {
  await db.connectDB()
  const category = await Category.findOne({ slug }).lean()

  if ( !category ) {
    return null
  }

  return JSON.parse( JSON.stringify( category ) )
}

export const getAllCategoriesForProducts = async (): Promise<ICategory[]> => {
  await db.connectDB()
  const categories = await Category.find().select('category').lean()

  return JSON.parse( JSON.stringify( categories ) )
}