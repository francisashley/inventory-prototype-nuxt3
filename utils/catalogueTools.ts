interface createItemItemOption {
  name?: string
  image?: string
}
export const createItem = (item: createItemItemOption): Item => {
  return {
    id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
    name: item.name || '',
    image: item.image || null,
  }
}

export const findItemById = (items: Item[], id: number): Item | null => {
  return items.find((item) => item.id === id) || null
}

export default {
  createItem,
  findItemById,
}
