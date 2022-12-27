import { Container, ContainerSlot, Item } from '../interfaces/inventory'

/**
 * Find item in slot
 */
export const findSlot = (container: Container, slotId: number) => {
  return container.slots[slotId]
}

/**
 * Clear contents of a slot
 */
export const clearSlot = (container: Container, slotId: number) => {
  return {
    ...container,
    slots: [...container.slots].map((slot, index) => {
      if (index === slotId) {
        return { ...slot, item: null }
      } else {
        return slot
      }
    }),
  }
}

/**
 * Set item in slot
 */
export const setSlot = (container: Container, slotId: number, item: Item) => {
  return {
    ...container,
    slots: [...container.slots].map((slot) => {
      if (slot.id === slotId) {
        return { ...slot, item }
      } else {
        return slot
      }
    }),
  }
}

/**
 * Deposit item in slot
 */
export const depositSlot = (container: Container, slotId: number, item: Item) => {
  const slot = findSlot(container, slotId)

  if (slot.item && slot.item.id === item.id) {
    return setSlot(container, slotId, { ...slot.item, amount: slot.item.amount + item.amount })
  } else {
    return setSlot(container, slotId, item)
  }
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

export default {
  findSlot,
  clearSlot,
  setSlot,
  depositSlot,
  depositFirstAvailableSlot,
}
