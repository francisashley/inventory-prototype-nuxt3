import { reactive, computed } from 'vue'
import { Container, Path, Item, ContainerSlot } from '../interfaces/inventory'
import containerTools from '@/utils/container.utils'

type Hand = {
  from: number[]
  item: Item
  isDragging: boolean
}

const state = reactive<{ containers: Container[]; hand: Hand | null; hoveredSlot: ContainerSlot | null }>({
  containers: [],
  hoveredSlot: null,
  hand: null,
})

export function useInventory() {
  const containers = computed(() => state.containers)
  const hoveredSlot = computed(() => state.hoveredSlot)
  const hand = computed(() => state.hand)

  const setHoveredSlot = (slot: ContainerSlot | null) => {
    state.hoveredSlot = slot
  }

  const createContainer = (container: Container) => {
    state.containers = [...state.containers, container]

    return {
      container: computed(() => containers.value.find((c) => c.id === container.id)),
    }
  }

  const updateContainer = (id: number, updatedContainer: Container) => {
    state.containers = state.containers.map((container) => {
      return container.id === id ? updatedContainer : container
    })
  }

  const findContainer = (id: number) => {
    return state.containers.find((container) => container.id === id)
  }

  const findSlot = (path: Path) => {
    return containerTools.findSlot(findContainer(path[0]), path[1])
  }

  const clearSlot = (path: Path) => {
    return containerTools.clearSlot(findContainer(path[0]), path[1])
  }

  const depositSlot = (path: Path, item: Item) => {
    return containerTools.depositSlot(findContainer(path[0]), path[1], item)
  }

  const setSlot = (path: Path, item: Item) => {
    return containerTools.setSlot(findContainer(path[0]), path[1], item)
  }

  const move = (from: Path, to: Path) => {
    const fromSlot = findSlot(from)
    updateContainer(findContainer(from[0]).id, clearSlot(from))
    updateContainer(findContainer(to[0]).id, depositSlot(to, fromSlot.item))
  }

  const swap = (from: Path, to: Path) => {
    const fromSlot = findSlot(from)
    const toSlot = findSlot(to)
    state.hand = { ...state.hand, item: toSlot.item }

    updateContainer(findContainer(to[0]).id, clearSlot(to))
    updateContainer(findContainer(to[0]).id, depositSlot(to, fromSlot.item))

    updateContainer(findContainer(from[0]).id, clearSlot(from))
    updateContainer(findContainer(from[0]).id, depositSlot(from, toSlot.item))
  }

  const pickup = (from: Path, amount: number, isDragging = false) => {
    if (state.hand) {
      const updatedItem = { ...state.hand.item, amount: state.hand.item.amount + amount }
      state.hand = { ...state.hand, item: updatedItem, isDragging }
    } else {
      state.hand = { from, item: { ...findSlot(from).item, amount }, isDragging }
    }

    if (isDragging) {
      return
    }

    const fromSlot = findSlot(from)
    if (fromSlot.item.amount - amount > 0) {
      updateContainer(
        findContainer(from[0]).id,
        setSlot(from, { ...fromSlot.item, amount: fromSlot.item.amount - amount })
      )
    } else {
      updateContainer(findContainer(from[0]).id, clearSlot(from))
    }
  }

  const exchange = (to: Path) => {
    const toSlot = findSlot(to)
    const hand = state.hand
    state.hand = { ...state.hand, item: toSlot.item }
    updateContainer(findContainer(to[0]).id, clearSlot(to))
    updateContainer(findContainer(to[0]).id, depositSlot(to, hand.item))
  }

  const deposit = (to: Path, amount?: number) => {
    const hand = state.hand
    amount = amount ?? hand.item.amount

    if (hand.item.amount - amount > 0) {
      state.hand = { ...hand, item: { ...hand.item, amount: hand.item.amount - amount } }
    } else {
      state.hand = null
    }

    const item = hand.item

    updateContainer(findContainer(to[0]).id, depositSlot(to, item))
  }

  const clearHand = () => {
    state.hand = null
  }

  const registerSlot = (path: Path) => {
    return computed(() => findSlot(path))
  }

  return {
    containers,
    createContainer,
    updateContainer,
    findContainer,
    registerSlot,
    move,
    swap,
    exchange,
    deposit,
    findSlot,
    pickup,
    clearHand,
    hand,
    hoveredSlot,
    setHoveredSlot,
  }
}
