export const createItem = (item: any) => {
  return {
    id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
    name: item.name || '',
    tags: item.tags || [],
    image: item.image || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export default {
  createItem,
}
