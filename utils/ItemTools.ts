import { Item } from '../interfaces/inventory'

/**
 * Return formatted item
 */
const parseItem = (item: Item): Item => {
  return {
    id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
    name: item.name || '',
    image: item.image || null,
  }
}

/**
 * Find item by id
 */
export const findItemById = (items: Item[], id: number): Item | null => {
  return items.find((item) => item.id === id) || null
}

export default function (items: Item[]) {
  items = items.map(parseItem)

  return {
    get: () => items,
    findItemById: (id: number) => findItemById(items, id),
  }
}
