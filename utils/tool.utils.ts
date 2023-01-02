import { Container, ContainerSlot, ID, Item } from '../interfaces/inventory'

export const findContainer = (containers: Map<ID, Container>, containerId: ID): Container => {
  return containers.get(containerId)
}

export const setContainer = (
  containers: Map<ID, Container>,
  containerId: ID,
  container: Container
): Map<ID, Container> => {
  return containers.set(containerId, container)
}

export const findSlot = (containers: Map<ID, Container>, containerId: ID, slotId: ID): ContainerSlot => {
  return containers.get(containerId).slots.get(slotId)
}

export const setSlot = (
  containers: Map<ID, Container>,
  containerId: ID,
  slotId: ID,
  slot: ContainerSlot
): Map<ID, Container> => {
  return containers.set(containerId, {
    ...containers.get(containerId),
    slots: containers.get(containerId).slots.set(slotId, slot),
  })
}

export const findSlotItem = (containers: Map<ID, Container>, containerId: ID, slotId: ID): Item => {
  return findSlot(containers, containerId, slotId).item
}

export const setSlotItem = (
  containers: Map<ID, Container>,
  containerId: ID,
  slotId: ID,
  item: Item | null
): Map<ID, Container> => {
  const slot = findSlot(containers, containerId, slotId)
  return setSlot(containers, containerId, slotId, { ...slot, item })
}

export default {
  containers: (containers: Map<ID, Container>) => {
    return {
      find: (containerId: ID): Container => {
        return findContainer(containers, containerId)
      },
      set: (containerId: ID, container: Container): Map<ID, Container> => {
        return setContainer(containers, containerId, container)
      },
      findSlot: (containerId: ID, slotId: ID): ContainerSlot => {
        return findSlot(containers, containerId, slotId)
      },
      setSlot: (containerId: ID, slotId: ID, slot: ContainerSlot): Map<ID, Container> => {
        return setSlot(containers, containerId, slotId, slot)
      },
      pickupSlot: (containerId: ID, slotId: ID, amount: number): [Item, Map<ID, Container>] => {
        const slot = findSlot(containers, containerId, slotId)
        const pickedUpItem = { ...slot.item, amount }
        const updatedSlotAmount = slot.item.amount - amount
        const updatedSlotItem = updatedSlotAmount > 0 ? { ...slot.item, amount: updatedSlotAmount } : null
        const updatedContainers = setSlotItem(containers, containerId, slotId, updatedSlotItem)
        return [pickedUpItem, updatedContainers]
      },
      depositSlot: (containerId: ID, slotId: ID, item: Item): Map<ID, Container> => {
        const slot = findSlot(containers, containerId, slotId)
        const isDepositingSameItem = slot.item && slot.item.id === item.id
        const updatedItem = isDepositingSameItem ? { ...item, amount: item.amount + slot.item.amount } : item
        return setSlotItem(containers, containerId, slotId, updatedItem)
      },
      clearSlot: (containerId: ID, slotId: ID): Map<ID, Container> => {
        const clearedSlot = { ...findSlot(containers, containerId, slotId), item: null }
        return setSlot(containers, containerId, slotId, clearedSlot)
      },
    }
  },
}
