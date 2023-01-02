import { Container, Path, ContainerSlot, ID } from '../interfaces/inventory'
import { useState } from './useState'
import tool from '@/utils/tool.utils'

export function useInventory() {
  const { containers, getContainer, addContainer, setContainer, setContainers, addSlot, getSlot } = useState()

  const saveContainer = (containerId: ID, container: Container) => {
    if (getContainer(containerId).value) {
      setContainer(containerId, container)
    } else {
      addContainer(container)
    }
  }

  const saveSlot = (containerId: ID, slotId: ID, slot: ContainerSlot) => {
    if (getSlot([containerId, slotId]).value) {
      // set slot
    } else {
      addSlot(containerId, slot)
    }
  }

  const move = (from: Path, to: Path) => {
    let [pickedUpItem, updatedContainers] = tool.containers(containers.value).pickupSlot(from[0], from[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(to[0], to[1], pickedUpItem)
    setContainers(updatedContainers)
  }

  return {
    saveContainer,
    saveSlot,
    move,
  }
}
