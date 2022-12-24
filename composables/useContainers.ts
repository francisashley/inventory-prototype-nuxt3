import { reactive, computed } from 'vue'
import { Container, Path, Item } from '../interfaces/inventory'
import containerTools from '@/utils/container.utils'

const state = reactive<{ containers: Container[] }>({
  containers: [],
})

export function useContainers() {
  const containers = computed(() => {
    return state.containers
  })

  const initContainer = (container: Container) => {
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

  const depositCell = (path: Path, item: Item, amount: number) => {
    return containerTools.depositCell(findContainer(path[0]), path[1], item, amount)
  }

  const move = (from: Path, to: Path) => {
    const fromCell = findCell(from)
    updateContainer(findContainer(from[0]).id, clearCell(from))
    updateContainer(findContainer(to[0]).id, depositCell(to, fromCell.item, fromCell.amount))
  }

  const swap = (from: Path, to: Path) => {
    const fromCell = findCell(from)
    const toCell = findCell(to)
    updateContainer(findContainer(from[0]).id, clearCell(from))
    updateContainer(findContainer(from[0]).id, depositCell(from, toCell.item, toCell.amount))
    updateContainer(findContainer(to[0]).id, clearCell(to))
    updateContainer(findContainer(to[0]).id, depositCell(to, fromCell.item, fromCell.amount))
  }

  return {
    containers,
    initContainer,
    updateContainer,
    removeContainer,
    findContainer,
    move,
    swap,
    findCell,
  }
}
