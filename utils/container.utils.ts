import { Container, Cell, Item } from '../interfaces/inventory'

/**
 * Find item in cell
 */
export const findCell = (container: Container, cellId: number) => {
  return container.cells[cellId]
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
 * Set item in cell
 */
export const setCell = (container: Container, cellId: number, item: Item) => {
  return {
    ...container,
    cells: [...container.cells].map((cell) => {
      if (cell.id === cellId) {
        return { ...cell, item }
      } else {
        return cell
      }
    }),
  }
}

/**
 * Deposit item in cell
 */
export const depositCell = (container: Container, cellId: number, item: Item) => {
  const cell = findCell(container, cellId)

  if (cell.item && cell.item.id === item.id) {
    return setCell(container, cellId, { ...cell.item, amount: cell.item.amount + item.amount })
  } else {
    return setCell(container, cellId, item)
  }
}

/**
 *  Deposit the item in the first available cell
 */
export const depositFirstAvailableCell = (cells: Cell[], item: Item): Cell[] => {
  cells = [...cells]

  const cell = cells.find((cell) => cell.item === null)

  if (cell) {
    cells[cell.id] = { ...cells[cell.id], item }
  }

  return cells
}

export default {
  findCell,
  clearCell,
  setCell,
  depositCell,
  depositFirstAvailableCell,
}
