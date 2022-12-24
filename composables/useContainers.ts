import { reactive, computed } from 'vue'
import ct from '@/utils/containerTools'

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

  const getContainer = (id: number) => {
    return state.containers.find((container) => container.id === id)
  }

  const move = (from: number[], to: number[]) => {
    const fromCell = ct(state.containers).findCell(from)
    const toCell = ct(state.containers).findCell(to)

    const shouldSwitch = toCell.item && toCell.item.id !== fromCell.item.id

    if (shouldSwitch) {
      state.containers = ct(state.containers).switchItems(from, to)
    } else {
      state.containers = [...ct(state.containers).moveItem(from, to)]
    }
  }

  return {
    containers,
    initContainer,
    updateContainer,
    removeContainer,
    getContainer,
    move,
  }
}
