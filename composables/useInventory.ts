import { reactive, computed } from 'vue'
import { Container, Path, Item, ContainerSlot, ID } from '../interfaces/inventory'
import { useState } from './useState'
import tool from '@/utils/tool.utils'

type HandState = {
  from: Path
  item: Item
  isDragging: boolean
}

interface InventoryState {
  handState: HandState | null
}

const state = reactive<InventoryState>({
  handState: null,
})

export function useInventory() {
  const { containers, hoveredSlot, getContainer, addContainer, setContainer, setContainers, addSlot, getSlot } =
    useState()

  const handState = computed(() => state.handState)

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

  const swap = (from: Path, to: Path) => {
    const fromItem = getSlot(from).value.item
    const toItem = getSlot(to).value.item

    state.handState = { ...state.handState, item: toItem }

    let updatedContainers = tool.containers(containers.value).clearSlot(to[0], to[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(to[0], to[1], fromItem)

    updatedContainers = tool.containers(updatedContainers).clearSlot(from[0], from[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(from[0], from[1], toItem)

    setContainers(updatedContainers)
  }

  const pickup = (from: Path, amount: number, isDragging = false) => {
    const handState = state.handState

    state.handState = {
      from,
      item: { ...getSlot(from).value.item, amount: handState ? handState.item.amount + amount : amount },
      isDragging,
    }

    if (isDragging) {
      return
    }

    setContainers(tool.containers(containers.value).pickupSlot(from[0], from[1], amount)[1])
  }

  const exchange = (to: Path) => {
    const toSlot = getSlot(to).value
    const heldItem = state.handState.item
    state.handState = { ...state.handState, item: toSlot.item }
    setContainers(tool.containers(containers.value).depositSlot(to[0], to[1], heldItem))
  }

  const deposit = (to: Path, amount?: number) => {
    const heldItem = state.handState.item
    amount = amount ?? heldItem.amount
    const leftInHand = heldItem.amount - amount
    state.handState = leftInHand > 0 ? { ...state.handState, item: { ...heldItem, amount: leftInHand } } : null
    setContainers(tool.containers(containers.value).depositSlot(to[0], to[1], heldItem))
  }

  const clearHand = () => {
    state.handState = null
  }

  return {
    saveContainer,
    saveSlot,
    move,
    hand: {
      state: handState,
      pickup,
      // release,
      exchange,
      deposit,
      swap,
      clear: clearHand,
    },
  }
}
