import { reactive, computed, ComputedRef } from 'vue'
import { Container, ContainerSlot, ID } from '../interfaces/inventory'
import tool from '@/utils/tool.utils'

interface InventoryState {
  containers: Map<ID, Container>
  hoveredSlot: ContainerSlot | null
}

const state = reactive<InventoryState>({
  containers: new Map(),
  hoveredSlot: null,
})

export function useState() {
  const setContainer = (containerId: ID, container: Container) => {
    state.containers = tool.containers(state.containers).set(containerId, container)
  }

  const getContainer = (containerId: ID): ComputedRef<Container> => {
    return computed(() => tool.containers(state.containers).find(containerId))
  }

  const setContainers = (containers: Map<ID, Container>) => {
    state.containers = containers
  }

  const setSlot = (containerId: ID, slotId: ID, slot: ContainerSlot) => {
    state.containers = tool.containers(state.containers).setSlot(containerId, slotId, slot)
  }

  const getSlot = (containerId: ID, slotId: ID): ComputedRef<ContainerSlot> => {
    return computed(() => tool.containers(state.containers).findSlot(containerId, slotId))
  }

  const setHoveredSlot = (slot: ContainerSlot | null) => {
    state.hoveredSlot = slot
  }

  return {
    containers: computed(() => state.containers),
    hoveredSlot: computed(() => state.hoveredSlot),
    setContainer,
    getContainer,
    setContainers,
    setSlot,
    getSlot,
    setHoveredSlot,
  }
}
