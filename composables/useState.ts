import { reactive, computed, ComputedRef } from 'vue'
import { Container, Path, ContainerSlot, ID } from '../interfaces/inventory'
import tool from '@/utils/tool.utils'

interface InventoryState {
  containers: Container[]
  hoveredSlot: ContainerSlot | null
}

const state = reactive<InventoryState>({
  containers: [],
  hoveredSlot: null,
})

export function useState() {
  const addContainer = (container: Container) => {
    state.containers = tool.containers(state.containers).add(container)
  }

  const getContainer = (containerId: ID): ComputedRef<Container> => {
    return computed(() => tool.containers(state.containers).find(containerId))
  }

  const setContainer = (containerId: ID, container: Container) => {
    state.containers = tool.containers(state.containers).update(containerId, container)
  }

  const setContainers = (containers: Container[]) => {
    state.containers = containers
  }

  const addSlot = (containerId: ID, slot: ContainerSlot) => {
    state.containers = tool.containers(state.containers).addSlot(containerId, slot)
  }

  const setSlot = (containerId: ID, slotId: ID, slot: ContainerSlot) => {
    state.containers = tool.containers(state.containers).updateSlot(containerId, slotId, slot)
  }

  const getSlot = ([containerId, slotId]: Path): ComputedRef<ContainerSlot> => {
    return computed(() => tool.containers(state.containers).findSlot(containerId, slotId))
  }

  const setHoveredSlot = (slot: ContainerSlot | null) => {
    state.hoveredSlot = slot
  }

  return {
    containers: computed(() => state.containers),
    hoveredSlot: computed(() => state.hoveredSlot),
    addContainer,
    getContainer,
    setContainer,
    setContainers,
    addSlot,
    setSlot,
    getSlot,
    setHoveredSlot,
  }
}
