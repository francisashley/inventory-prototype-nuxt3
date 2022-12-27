import { ContainerSize, Cell, Item, Input } from '../interfaces/inventory'
import { generateArray, findLastIndex } from '@/utils/array.utils'

export const getRandomItem = (items: Item[]) => {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  return { ...item, amount: randomAmount }
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
