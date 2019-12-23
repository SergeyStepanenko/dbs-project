import { Product } from '../../../models'
import { transformProduct } from '../../../utils/transformers'

interface IProduct {
  title: string
  description: string
  price: string
  images: string[]
}

export default async function productCreate(input: { productInput: IProduct }) {
  try {
    const {
      productInput: { title, description, price, images }
    } = input

    const product = new Product({
      title,
      description,
      price,
      images
    })

    const result = await product.save()

    return transformProduct(result)
  } catch (error) {
    throw error
  }
}
