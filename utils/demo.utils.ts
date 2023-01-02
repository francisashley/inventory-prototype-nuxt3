import { ContainerSlot, Item, Input } from '../interfaces/inventory'
import { generateId } from './id.utils'
import { generateArray, findLastIndex } from '@/utils/array.utils'

type ContainerSize = [number, number]

/**
 * Return formatted container
 */
type InputContainer = {
  color: 'blue' | 'red'
  size: ContainerSize
}
export const createContainer = ({ color, size }: InputContainer) => {
  const id = generateId()
  let slots = generateSlots(id, size)
  return { id, color, slots }
}

/**
 * Return formatted slot
 */
export const createSlot = (containerId: number, slotId: number) => {
  return {
    id: slotId,
    path: [containerId, slotId],
    item: null,
  }
}

/**
 * Return formatted item
 */
type InputItem = {
  id?: string | number
  name?: string
  image?: string
  amount?: number
}
export const createItem = (item: InputItem): Item => {
  return {
    id: generateId(),
    name: item.name || '',
    image: item.image || null,
    amount: item.amount || 0,
  }
}

/**
 * Get a random item and amount
 */
export const getRandomItem = (items: Item[]) => {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  return { ...item, amount: randomAmount }
}

/**
 * Get a list of random items
 */
export const getRandomItems = (items: Item[], amount: number) => {
  const randomItems = []
  for (let i = 0; i < amount; i++) {
    randomItems.push(getRandomItem(items))
  }
  return randomItems
}

/**
 * Generate container slots from input data
 */
export const generateSlots = (id: number, size: ContainerSize): ContainerSlot[] => {
  const totalSlots = size[0] * size[1]
  return generateArray(totalSlots).map((_, slotId) => createSlot(id, slotId))
}

/**
 * Calculate the total amount of slots needed for the container
 */
export const calculateTotalNeededSlots = (containerSize: ContainerSize, currentSlots: Input[]) => {
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

/**
 *  Deposit the item in the first available slot
 */
export const depositFirstAvailableSlot = (slots: ContainerSlot[], item: Item): ContainerSlot[] => {
  slots = [...slots]

  const slot = slots.find((slot) => slot.item === null)

  if (slot) {
    slots[slot.id] = { ...slots[slot.id], item }
  }

  return slots
}
