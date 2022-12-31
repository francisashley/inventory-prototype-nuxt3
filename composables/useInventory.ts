import { reactive, computed, ComputedRef } from 'vue'
import { Container, Path, Item, ContainerSlot } from '../interfaces/inventory'
import tool from '@/utils/tool.utils'

type Hand = {
  from: Path
  item: Item
  isDragging: boolean
}

interface InventoryState {
  containers: Container[]
  hand: Hand | null
  hoveredSlot: ContainerSlot | null
}

const state = reactive<InventoryState>({
  containers: [],
  hoveredSlot: null,
  hand: null,
})

export function useInventory() {
  const containers = computed(() => state.containers)
  const hoveredSlot = computed(() => state.hoveredSlot)
  const hand = computed(() => state.hand)

  const registerContainer = (container: Container) => {
    state.containers = [...state.containers, container]
    return getComputedContainer(container.id)
  }

  const registerSlot = () => {
    // register slot
  }

  const getComputedContainer = (containerId: number): ComputedRef<Container> => {
    return computed(() => tool.containers(state.containers).find(containerId))
  }

  const getComputedSlot = ([containerId, slotId]: Path): ComputedRef<ContainerSlot> => {
    return computed(() => findSlot([containerId, slotId]))
  }

  const setHoveredSlot = (slot: ContainerSlot | null) => {
    state.hoveredSlot = slot
  }

  const updateContainer = (containerId: number, updatedContainer: Container) => {
    state.containers = tool.containers(state.containers).update(containerId, updatedContainer)
  }

  const findSlot = ([containerId, slotId]: Path) => {
    return tool.containers(state.containers).findSlot(containerId, slotId)
  }

  const move = (from: Path, to: Path) => {
    let [pickedUpItem, updatedContainers] = tool.containers(state.containers).pickupSlot(from[0], from[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(to[0], to[1], pickedUpItem)
    state.containers = updatedContainers
  }

  const swap = (from: Path, to: Path) => {
    const fromItem = tool.containers(state.containers).findSlot(from[0], from[1]).item
    const toItem = tool.containers(state.containers).findSlot(to[0], to[1]).item

    state.hand = { ...state.hand, item: toItem }

    let updatedContainers = tool.containers(state.containers).clearSlot(to[0], to[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(to[0], to[1], fromItem)

    updatedContainers = tool.containers(updatedContainers).clearSlot(from[0], from[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(from[0], from[1], toItem)

    state.containers = updatedContainers
  }

  const pickup = (from: Path, amount: number, isDragging = false) => {
    const hand = state.hand

    state.hand = {
      from,
      item: { ...findSlot(from).item, amount: hand ? hand.item.amount + amount : amount },
      isDragging,
    }

    if (isDragging) {
      return
    }

    state.containers = tool.containers(state.containers).pickupSlot(from[0], from[1], amount)[1]
  }

  const exchange = (to: Path) => {
    const toSlot = tool.containers(state.containers).findSlot(to[0], to[1])
    const heldItem = state.hand.item
    state.hand = { ...state.hand, item: toSlot.item }
    state.containers = tool.containers(state.containers).depositSlot(to[0], to[1], heldItem)
  }

  const deposit = (to: Path, amount?: number) => {
    const heldItem = state.hand.item
    amount = amount ?? heldItem.amount
    const leftInHand = heldItem.amount - amount
    state.hand = leftInHand > 0 ? { ...state.hand, item: { ...heldItem, amount: leftInHand } } : null
    state.containers = tool.containers(state.containers).depositSlot(to[0], to[1], heldItem)
  }

  const clearHand = () => {
    state.hand = null
  }

  return {
    // register
    registerContainer,
    registerSlot,
    // state
    containers,
    hand,
    hoveredSlot,
    // get custom state
    getComputedContainer,
    getComputedSlot,
    // update
    updateContainer,
    move,
    swap,
    exchange,
    deposit,
    findSlot,
    pickup,
    clearHand,
    setHoveredSlot,
  }
}
