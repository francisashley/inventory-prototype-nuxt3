import { Item } from '../interfaces/inventory'
import { generateId } from './id.utils'

/**
 * Return formatted item
 */
export const parseItem = (item: Item): Item => {
  return {
    id: generateId(),
    name: item.name || '',
    image: item.image || null,
  }
}

export default {
  parseItem,
}
