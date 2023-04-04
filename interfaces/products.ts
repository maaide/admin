export interface IProduct {
  _id?: string
  name: string
  description: string
  images: string[]
  stock: number
  price: number
  beforePrice?: number
  cost?: number
  timeOffer?: string
  variations?: IVariation[]
  nameVariations?: string
  productsOffer?: IProductsOffer[]
  slug: string
  tags: string[]
  category: string
  reviews?: IReview[]
  state: boolean,
  sku?: string,
  titleSeo?: string
  descriptionSeo?: string

  createdAt?: string
  updatedAt?: string
}

export interface IReview {
  _id?: string
  calification: number
  name: string
  email?: string
  title?: string
  review: string
  createdAt: Date
}

export interface IProductsOffer {
  productsSale: IProductOffer[]
  price: number
}

export interface IProductOffer {
  name: string
  beforePrice: number
  images: string[]
  slug: string
  variations?: IVariation[]
  category: string
  price: number
}

export interface IVariation {
  variation: string
  image?: string
  stock: number
  sku?: string
}