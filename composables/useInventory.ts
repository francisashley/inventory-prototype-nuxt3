import { reactive, computed } from 'vue'
import { Container, Path, Item, Cell } from '../interfaces/inventory'
import containerTools from '@/utils/container.utils'

type Hand = {
  from: number[]
  item: Item
  isDragging: boolean
}

const state = reactive<{ containers: Container[]; hand: Hand | null; hoveredCell: Cell | null }>({
  containers: [],
  hand: null,
  hoveredCell: null,
})

export function useInventory() {
  const containers = computed(() => {
    return state.containers
  })

  const hand = computed(() => state.hand)

  const hoveredCell = computed(() => state.hoveredCell)

  const setHoveredCell = (cell: Cell | null) => {
    state.hoveredCell = cell
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

  const removeContainer = (id: number) => {
    state.containers = state.containers.filter((container) => container.id !== id)
  }

  const findContainer = (id: number) => {
    return state.containers.find((container) => container.id === id)
  }

  const findCell = (path: Path) => {
    return containerTools.findCell(findContainer(path[0]), path[1])
  }

  const clearCell = (path: Path) => {
    return containerTools.clearCell(findContainer(path[0]), path[1])
  }

  const depositCell = (path: Path, item: Item) => {
    return containerTools.depositCell(findContainer(path[0]), path[1], item)
  }

  const setCell = (path: Path, item: Item) => {
    return containerTools.setCell(findContainer(path[0]), path[1], item)
  }

  const move = (from: Path, to: Path) => {
    const fromCell = findCell(from)
    updateContainer(findContainer(from[0]).id, clearCell(from))
    updateContainer(findContainer(to[0]).id, depositCell(to, fromCell.item))
  }

  const swap = (from: Path, to: Path) => {
    const fromCell = findCell(from)
    const toCell = findCell(to)
    state.hand = { ...state.hand, item: toCell.item }

    updateContainer(findContainer(to[0]).id, clearCell(to))
    updateContainer(findContainer(to[0]).id, depositCell(to, fromCell.item))

    updateContainer(findContainer(from[0]).id, clearCell(from))
    updateContainer(findContainer(from[0]).id, depositCell(from, toCell.item))
  }

  const pickup = (from: Path, amount: number, isDragging = false) => {
    if (state.hand) {
      const updatedItem = { ...state.hand.item, amount: state.hand.item.amount + amount }
      state.hand = { ...state.hand, item: updatedItem, isDragging }
    } else {
      state.hand = { from, item: { ...findCell(from).item, amount }, isDragging }
    }

    if (isDragging) {
      return
    }

    const fromCell = findCell(from)
    if (fromCell.item.amount - amount > 0) {
      updateContainer(
        findContainer(from[0]).id,
        setCell(from, { ...fromCell.item, amount: fromCell.item.amount - amount })
      )
    } else {
      updateContainer(findContainer(from[0]).id, clearCell(from))
    }
  }

  const exchange = (to: Path) => {
    const toCell = findCell(to)
    const hand = state.hand
    state.hand = { ...state.hand, item: toCell.item }
    updateContainer(findContainer(to[0]).id, clearCell(to))
    updateContainer(findContainer(to[0]).id, depositCell(to, hand.item))
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

    updateContainer(findContainer(to[0]).id, depositCell(to, item))
  }

  const clearHand = () => {
    state.hand = null
  }

  return {
    containers,
    createContainer,
    updateContainer,
    removeContainer,
    findContainer,
    move,
    swap,
    exchange,
    deposit,
    findCell,
    pickup,
    clearHand,
    hand,
    hoveredCell,
    setHoveredCell,
  }
}
