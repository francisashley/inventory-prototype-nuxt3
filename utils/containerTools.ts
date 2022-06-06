/**
 * Create a new container.
 */
export const create = (container: Container): Container => {
  const { rows = 2, cols = 8, name = '', theme = 'white' } = container

  const containerId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))

  const cells = Array(rows * cols)
    .fill(null)
    .map((_, cellId) => ({ id: cellId, path: [containerId, cellId], item: null, amount: 0 }))

  return { id: containerId, name, theme, cells, rows, cols }
}

/**
 * Find item in cell
 */
export const findCell = (container: Container, cellId: number) => {
  return container.cells[cellId]
}

/**
 *  Deposit the item in the first available cell
 */
export const depositFirstAvailableCell = (container: Container, item: Item, amount: number = 1): Container => {
  const cells = [...container.cells]

  const cell = cells.find((cell) => cell.item === null)

  if (cell) {
    cells[cell.id] = { ...cells[cell.id], item, amount }
  }

  return { ...container, cells }
}

/**
 * Clear contents of a cell
 */
export const clearCell = (container: Container, cellId: number) => {
  return {
    ...container,
    cells: [...container.cells].map((cell, index) => {
      if (index === cellId) {
        return { ...cell, item: null }
      } else {
        return cell
      }
    }),
  }
}

/**
 * Deposit item in cell
 */
export const depositCell = (container: Container, cellId: number, item: Item, amount: number) => {
  return {
    ...container,
    cells: [...container.cells].map((cell) => {
      if (cell.id === cellId) {
        amount = cell.item?.id === item.id ? cell.amount + amount : amount
        return { ...cell, item, amount }
      } else {
        return cell
      }
    }),
  }
}

export default function (container: Container) {
  return {
    create: () => create(container),
    findCell: (cellId) => findCell(container, cellId),
    clearCell: (item) => clearCell(container, item),
    depositCell: (cellId, item, amount) => depositCell(container, cellId, item, amount),
    depositFirstAvailableCell: (item, amount) => depositFirstAvailableCell(container, item, amount),
  }
}
