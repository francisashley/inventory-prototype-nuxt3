interface createItemItemOption {
  name?: string
  image?: string
}
export const createItem = (item: createItemItemOption): item => {
  return {
    id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
    name: item.name || '',
    image: item.image || null,
  }
}

export const findItemById = (items: item[], id: number): item | null => {
  return items.find((item) => item.id === id) || null
}

export default {
  createItem,
  findItemById,
}
