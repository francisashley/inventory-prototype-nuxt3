import { Container, ContainerSize, Cell, Item, Input } from '../interfaces/inventory'
import { generateId } from '@/utils/id.utils'
import { generateArray, findLastIndex } from '@/utils/array.utils'

/**
 * Return formatted container
 */
type createContainerOptions = {
  id?: number
  name?: string
  size?: ContainerSize
  items?: Input[]
}

export const createContainer = (options: createContainerOptions): Container => {
  const id = options.id ?? generateId()
  const name = options.name ?? ''
  const size = options.size ?? ([8, 2] as ContainerSize)
  const cells = generateCells(id, size, options.items || [])

  return { ...options, id, name, cells, size }
}

/**
 * Generate container cells from input data
 */
export const generateCells = (id: number, size: ContainerSize, currentCells: Input[]): Cell[] => {
  const calculateTotalCells = (containerSize: ContainerSize, currentCells: Input[]) => {
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

  const totalCells = calculateTotalCells(size, currentCells)

  const cells = generateArray(totalCells).map((_, cellId) => ({
    id: cellId,
    path: [id, cellId],
    item: currentCells?.[cellId]?.item || null,
  }))

  return cells
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
  createContainer,
  findCell,
  clearCell,
  setCell,
  depositCell,
  depositFirstAvailableCell,
}
