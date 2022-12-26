import { reactive, computed } from 'vue'
import { Container, Path, Item, Cell } from '../interfaces/inventory'
import containerTools from '@/utils/container.utils'

type Hand = {
  from: number[]
  item: Item
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

  const addContainer = (container: Container) => {
    state.containers = [...state.containers, container]
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

  const move = (from: Path, to: Path) => {
    const fromCell = findCell(from)
    updateContainer(findContainer(from[0]).id, clearCell(from))
    updateContainer(findContainer(to[0]).id, depositCell(to, fromCell.item))
  }

  const swap = (from: Path, to: Path) => {
    const fromCell = findCell(from)
    const toCell = findCell(to)
    updateContainer(findContainer(from[0]).id, clearCell(from))
    updateContainer(findContainer(from[0]).id, depositCell(from, toCell.item))
    updateContainer(findContainer(to[0]).id, clearCell(to))
    updateContainer(findContainer(to[0]).id, depositCell(to, fromCell.item))
  }

  const setHand = (from: number[], amount: number) => {
    state.hand = { from, amount }
  }

  const clearHand = () => {
    state.hand = null
  }

  return {
    containers,
    addContainer,
    updateContainer,
    removeContainer,
    findContainer,
    move,
    swap,
    findCell,
    hand,
    setHand,
    clearHand,
    hoveredCell,
    setHoveredCell,
  }
}
