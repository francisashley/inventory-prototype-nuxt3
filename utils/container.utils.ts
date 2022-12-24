import { Container, ContainerSize, Cell, Item } from '../interfaces/inventory'
import { generateId } from '@/utils/id.utils'
import { generateArray, findLastIndex } from '@/utils/array.utils'

/**
 * Return formatted container
 */
export const parseContainer = (container: Container): Container => {
  const id = 'id' in container ? container.id : generateId()
  const name = 'name' in container ? container.name : ''
  const color = 'color' in container ? container.color : 'white'
  const size = 'size' in container ? container.size : ([8, 2] as ContainerSize)

  const calculateTotalCells = (containerSize: ContainerSize, currentCells: Cell[]) => {
    const containerCols = containerSize[0]
    const containerRows = containerSize[1]

    const lastFilledIndex = findLastIndex(currentCells, (cell) => cell.item !== null)
    const lastFilledRow = lastFilledIndex === -1 ? 0 : Math.floor(lastFilledIndex / containerSize[0])

    const currentNeededCells = (lastFilledRow + 1) * containerCols

    const minimumCells = containerCols * containerRows

    if (currentNeededCells < minimumCells) {
      return minimumCells
    }

    const currentFilledCellsAmount = currentCells.filter((cell) => cell.item !== null).length

    if (currentFilledCellsAmount >= currentNeededCells - 1) {
      return currentNeededCells + containerCols
    }

    return currentNeededCells
  }

  const currentCells = container.cells || []
  const totalCells = calculateTotalCells(size, currentCells)

  const cells = generateArray(totalCells).map((_, cellId) => ({
    id: cellId,
    path: [id, cellId],
    item: container?.cells?.[cellId]?.item || null,
    amount: container?.cells?.[cellId]?.amount || 0,
  }))

  return { id, name, color, cells, size }
}

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
        return { ...cell, item: null, amount: 0 }
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
        return { ...cell, item, amount: cell.amount + amount }
      } else {
        return cell
      }
    }),
  }
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

  return parseContainer({ ...container, cells })
}

export default {
  parseContainer,
  findCell,
  clearCell,
  depositCell,
  depositFirstAvailableCell,
}
