interface createItemItemOption {
  name?: string
  tags?: string[]
  image?: string
}
export const createItem = (item: createItemItemOption): item => {
  return {
    id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
    name: item.name || '',
    tags: item.tags || [],
    image: item.image || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export const findItemById = (items: item[], id: number): item | null => {
  return items.find((item) => item.id === id) || null
}

interface createContainerContainerOption {
  name?: string
  theme?: 'white' | 'red' | 'blue' | string
  rows?: number
  cols?: number
}
export const createContainer = (container: createContainerContainerOption): container => {
  const rows = container.rows || 2
  const cols = container.cols || 8
  return {
    id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
    name: container.name || '',
    theme: container.theme || 'white',
    // items: Array(rows * cols).fill(null),
    items: [],
    rows,
    cols,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

interface addItemToContainerOptions {
  index?: number
  amount?: number
}
export const addItemToContainer = (container: container, item: item, options: addItemToContainerOptions): container => {
  const { index, amount = 1 } = options

  container = {
    ...container,
    items: [...container.items, { id: item.id, amount }],
  }

  return container
}

export const enrichContainerItems = (container: container, items: item[]): container => {
  return {
    ...container,
    items: [...container.items].map((item) => ({
      ...item,
      ...findItemById(items, item.id),
    })),
  }
}

export default {
  createItem,
  findItemById,
  createContainer,
  addItemToContainer,
  enrichContainerItems,
}
