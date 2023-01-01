import { reactive, computed, ComputedRef } from 'vue'
import { Container, Path, Item, ContainerSlot } from '../interfaces/inventory'
import tool from '@/utils/tool.utils'

type HandState = {
  from: Path
  item: Item
  isDragging: boolean
}

interface InventoryState {
  containers: Container[]
  handState: HandState | null
  hoveredSlot: ContainerSlot | null
}

const state = reactive<InventoryState>({
  containers: [],
  hoveredSlot: null,
  handState: null,
})

export function useInventory() {
  const containers = computed(() => state.containers)
  const hoveredSlot = computed(() => state.hoveredSlot)
  const handState = computed(() => state.handState)

  const saveContainer = (containerId: number, container: Container) => {
    const exists = Boolean(tool.containers(state.containers).find(containerId))
    if (exists) {
      state.containers = tool.containers(state.containers).update(containerId, container)
    } else {
      state.containers = tool.containers(state.containers).add(container)
    }
  }

  const saveSlot = (containerId: number, slotId: number, slot: ContainerSlot) => {
    const exists = Boolean(tool.containers(state.containers).findSlot(containerId, slotId))
    if (exists) {
      state.containers = tool.containers(state.containers).addSlot(containerId, slot)
    }
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

    state.handState = { ...state.handState, item: toItem }

    let updatedContainers = tool.containers(state.containers).clearSlot(to[0], to[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(to[0], to[1], fromItem)

    updatedContainers = tool.containers(updatedContainers).clearSlot(from[0], from[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(from[0], from[1], toItem)

    state.containers = updatedContainers
  }

  const pickup = (from: Path, amount: number, isDragging = false) => {
    const handState = state.handState

    state.handState = {
      from,
      item: { ...findSlot(from).item, amount: handState ? handState.item.amount + amount : amount },
      isDragging,
    }

    if (isDragging) {
      return
    }

    state.containers = tool.containers(state.containers).pickupSlot(from[0], from[1], amount)[1]
  }

  const exchange = (to: Path) => {
    const toSlot = tool.containers(state.containers).findSlot(to[0], to[1])
    const heldItem = state.handState.item
    state.handState = { ...state.handState, item: toSlot.item }
    state.containers = tool.containers(state.containers).depositSlot(to[0], to[1], heldItem)
  }

  const deposit = (to: Path, amount?: number) => {
    const heldItem = state.handState.item
    amount = amount ?? heldItem.amount
    const leftInHand = heldItem.amount - amount
    state.handState = leftInHand > 0 ? { ...state.handState, item: { ...heldItem, amount: leftInHand } } : null
    state.containers = tool.containers(state.containers).depositSlot(to[0], to[1], heldItem)
  }

  const clearHand = () => {
    state.handState = null
  }

  return {
    // register
    saveContainer,
    saveSlot,
    // state
    containers,
    hoveredSlot,
    // get custom state
    getComputedContainer,
    getComputedSlot,
    // update
    move,
    swap,
    findSlot,
    clearHand,
    setHoveredSlot,
    hand: {
      state: handState,
      pickup,
      // release,
      exchange,
      deposit,
    },
  }
}
