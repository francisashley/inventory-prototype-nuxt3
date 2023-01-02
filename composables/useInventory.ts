import { Container, Path, ContainerSlot, ID } from '../interfaces/inventory'
import { useState } from './useState'
import tool from '@/utils/tool.utils'

export function useInventory() {
  const { containers, getContainer, setContainer, setContainers, setSlot, getSlot } = useState()

  const saveContainer = (containerId: ID, container: Container) => {
    if (getContainer(containerId).value) {
      setContainer(containerId, container)
    } else {
      setContainer(container.id, container)
    }
  }

  const saveSlot = (containerId: ID, slotId: ID, slot: ContainerSlot) => {
    if (getSlot([containerId, slotId]).value) {
      // set slot
    } else {
      setSlot(containerId, slot.id, slot)
    }
  }

  const move = (from: Path, to: Path) => {
    const amount = tool.containers(containers.value).findSlot(from[0], from[1]).item.amount
    let [pickedUpItem, updatedContainers] = tool.containers(containers.value).pickUpSlot(from[0], from[1], amount)
    updatedContainers = tool.containers(updatedContainers).depositSlot(to[0], to[1], pickedUpItem)
    setContainers(updatedContainers)
  }

  return {
    saveContainer,
    saveSlot,
    move,
  }
}
