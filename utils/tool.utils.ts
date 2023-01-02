import { Container, ContainerSlot, ID, Item } from '../interfaces/inventory'

export default {
  containers: (containers: Container[]) => {
    return {
      find: (containerId: ID) => {
        return containers.find((container) => container.id === containerId)
      },
      update: (containerId: ID, updatedContainer: Container) => {
        return containers.map((container) => {
          return container.id === containerId ? updatedContainer : container
        })
      },
      add: (container: Container) => {
        return [...containers, container]
      },
      findSlot: (containerId: ID, slotId: ID) => {
        const container = containers.find((container) => container.id === containerId)
        return container.slots.find((slot) => slot.id === slotId)
      },
      addSlot: (containerId: ID, slot: ContainerSlot) => {
        return containers.map((container) => {
          if (container.id === containerId) {
            return {
              ...container,
              slots: [...container.slots, slot],
            }
          }
          return container
        })
      },
      updateSlot: (containerId: ID, slotId: ID, slot: ContainerSlot) => {
        return containers.map((container) => {
          if (container.id === containerId) {
            const slots = container.slots.map((_slot) => (_slot.id === slotId ? slot : _slot))
            return { ...container, slots }
          }
          return container
        })
      },
      depositSlot: (containerId: ID, slotId: ID, item: Item) => {
        return containers.map((container) => {
          if (container.id === containerId) {
            return {
              ...container,
              slots: container.slots.map((slot) => {
                if (slot.id === slotId) {
                  const shouldStack = slot.item && slot.item.id === item.id
                  const updatedItem = shouldStack ? { ...slot.item, amount: slot.item.amount + item.amount } : item
                  const updatedSlot = { ...slot, item: updatedItem }
                  return updatedSlot
                } else {
                  return slot
                }
              }),
            }
          }
          return container
        })
      },
      pickupSlot: (containerId: ID, slotId: ID, amount = null) => {
        let pickedUpItem = null
        const updatedContainers = containers.map((container) => {
          if (container.id === containerId) {
            return {
              ...container,
              slots: container.slots.map((slot) => {
                if (slot.id === slotId && slot.item) {
                  let pickedUpAmount = amount ?? slot.item.amount
                  pickedUpAmount = pickedUpAmount > slot.item.amount ? slot.item.amount : pickedUpAmount
                  pickedUpItem = { ...slot.item, amount: pickedUpAmount }
                  const updatedItem = { ...slot.item, amount: slot.item.amount - pickedUpAmount }
                  return { ...slot, item: updatedItem.amount > 0 ? updatedItem : null }
                } else {
                  return slot
                }
              }),
            }
          }
          return container
        })
        return [pickedUpItem, updatedContainers]
      },
      clearSlot: (containerId: ID, slotId: ID) => {
        return containers.map((container) => {
          if (container.id === containerId) {
            return {
              ...container,
              slots: container.slots.map((slot) => {
                if (slot.id === slotId) {
                  return { ...slot, item: null }
                } else {
                  return slot
                }
              }),
            }
          }
          return container
        })
      },
    }
  },
}
