/**
 * Create a new container.
 */
export const createContainer = (container: looseContainer): container => {
  const rows = container.rows || 2
  const cols = container.cols || 8
  return {
    id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
    name: container.name || '',
    theme: container.theme || 'white',
    items: Array(rows * cols).fill(null),
    rows,
    cols,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Add an item at index. The item will merge if an item of the same type already exists there.
 */
export const addItemAtIndex = (container: container, index: number, item: containerItem): container => {
  const items = [...container.items]

  const isMerging = items[index] && items[index].id === item.id

  if (isMerging) {
    items[index] = { ...items[index], amount: items[index].amount + (item.amount || 1) }
  } else {
    items[index] = { ...item, amount: item.amount || 1 }
  }

  return { ...container, items }
}

/**
 * Add an item at the first available spot.
 */
export const appendItem = (container: container, item: containerItem): container => {
  const items = [...container.items]

  let index = items.findIndex((item) => item === null)
  index = typeof index === 'number' ? index : items.length - 1

  return addItemAtIndex(container, index, { ...item, amount: item.amount || 1 })
}

/**
 * Remove item at index.
 */
export const clearIndex = (container: container, index: number): container => {
  const items = [...container.items]

  if (typeof index === 'number') {
    items[index] = null
  }

  return { ...container, items }
}

/**
 * Get item at index
 */
export const findItemAtIndex = (container: container, index: number): item => {
  return [...container.items][index]
}

/**
 * Find index of Id
 */

export const findIndexOfId = (containers: container[], id: number) => {
  return containers.findIndex((container) => container.id === id)
}

export default {
  createContainer,
  addItemAtIndex,
  appendItem,
  clearIndex,
  findItemAtIndex,
  findIndexOfId,
}
