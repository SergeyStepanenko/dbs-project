import { Product } from '../../../models'
import { transformProduct } from '../../../utils/transformers'

export default async function productListGet() {
  try {
    const productList = await Product.find()

    return productList.map(transformProduct)
  } catch (error) {
    throw error
  }
}
