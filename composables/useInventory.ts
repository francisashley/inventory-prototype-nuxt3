import { Container, ContainerSlot, ID } from '../interfaces/inventory'
import { useState } from './useState'

export function useInventory() {
  const { getContainer, setContainer, setSlot, getSlot } = useState()

  const saveContainer = (containerId: ID, container: Container) => {
    if (getContainer(containerId).value) {
      setContainer(containerId, container)
    } else {
      setContainer(container.id, container)
    }
  }

  const saveSlot = (containerId: ID, slotId: ID, slot: ContainerSlot) => {
    if (getSlot(containerId, slotId).value) {
      // set slot
    } else {
      setSlot(containerId, slot.id, slot)
    }
  }

  return {
    saveContainer,
    saveSlot,
  }
}
