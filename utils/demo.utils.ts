import { Item } from '../interfaces/inventory'

export const getRandomItem = (items: Item[]) => {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  return { ...item, amount: randomAmount }
}
