import { Item } from '../interfaces/inventory'
import { generateId } from './id.utils'

/**
 * Return formatted item
 */
type InputItem = {
  id?: string | number
  name?: string
  image?: string
  amount?: number
}
export const createItem = (item: InputItem): Item => {
  return {
    id: generateId(),
    name: item.name || '',
    image: item.image || null,
    amount: item.amount || 0,
  }
}

export default {
  createItem,
}
