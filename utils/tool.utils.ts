export default {
  containers: (containers) => {
    return {
      find: (containerId) => {
        return containers.find((container) => container.id === containerId)
      },
      update: (containerId, updatedContainer) => {
        return containers.map((container) => {
          return container.id === containerId ? updatedContainer : container
        })
      },
      add: (container) => {
        return [...containers, container]
      },
      findSlot: (containerId, slotId) => {
        const container = containers.find((container) => container.id === containerId)
        return container.slots.find((slot) => slot.id === slotId)
      },
      depositSlot: (containerId, slotId, item) => {
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
      pickupSlot: (containerId, slotId, amount = null) => {
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
      clearSlot: (containerId, slotId) => {
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
