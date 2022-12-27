import { ContainerSize, ContainerSlot, Item, Input } from '../interfaces/inventory'
import { generateArray, findLastIndex } from '@/utils/array.utils'

export const getRandomItem = (items: Item[]) => {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  return { ...item, amount: randomAmount }
}

/**
 * Generate container slots from input data
 */
export const generateSlots = (id: number, size: ContainerSize, currentSlots: Input[]): ContainerSlot[] => {
  const calculateTotalSlots = (containerSize: ContainerSize, currentSlots: Input[]) => {
    const containerCols = containerSize[0]
    const containerRows = containerSize[1]

    const lastFilledIndex = findLastIndex(currentSlots, (slot) => slot.item !== null)
    const lastFilledRow = lastFilledIndex === -1 ? 0 : Math.floor(lastFilledIndex / containerSize[0])

    const currentNeededSlots = (lastFilledRow + 1) * containerCols

    const minimumSlots = containerCols * containerRows

    if (currentNeededSlots < minimumSlots) {
      return minimumSlots
    }

    const currentFilledSlotsAmount = currentSlots.filter((slot) => slot.item !== null).length

    if (currentFilledSlotsAmount >= currentNeededSlots - 1) {
      return currentNeededSlots + containerCols
    }

    return currentNeededSlots
  }

  const totalSlots = calculateTotalSlots(size, currentSlots)

  const slots = generateArray(totalSlots).map((_, slotId) => ({
    id: slotId,
    path: [id, slotId],
    item: currentSlots?.[slotId]?.item || null,
  }))

  return slots
}
