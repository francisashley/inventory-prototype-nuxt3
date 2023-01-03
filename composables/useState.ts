import { reactive, computed, ComputedRef } from 'vue'
import { Container, ContainerSlot, ID, ValueItem } from '../interfaces/inventory'
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
  const registerContainer = (containerId: ID) => {
    state.containers = tool.containers(state.containers).set(containerId, {
      id: containerId,
      slots: new Map(),
      items: [],
    })
  }

  const setContainerItems = (containerId: ID, items: ValueItem[]) => {
    const container = tool.containers(state.containers).find(containerId)
    state.containers = tool.containers(state.containers).set(containerId, { ...container, items })
  }

  const setContainer = (containerId: ID, container: Container) => {
    state.containers = tool.containers(state.containers).set(containerId, container)
  }

  const getContainer = (containerId: ID): ComputedRef<Container> => {
    return computed(() => {
      return tool.containers(state.containers).find(containerId)
    })
  }

  const setContainers = (containers: Map<ID, Container>) => {
    state.containers = containers
  }

  const registerSlot = (containerId: ID, slotId: ID) => {
    const slotItem =
      Array.from(tool.containers(state.containers).find(containerId).items.values()).find(
        (item) => containerId === item.path[0] && slotId === item.path[1]
      )?.item || null

    state.containers = tool
      .containers(state.containers)
      .setSlot(containerId, slotId, { id: slotId, path: [containerId, slotId], item: slotItem })
  }

  const setSlot = (containerId: ID, slotId: ID, slot: ContainerSlot) => {
    state.containers = tool.containers(state.containers).setSlot(containerId, slotId, slot)
  }

  const getSlot = (containerId: ID, slotId: ID): ComputedRef<ContainerSlot> => {
    return computed(() => {
      return tool.containers(state.containers).findSlot(containerId, slotId)
    })
  }

  const setHoveredSlot = (slot: ContainerSlot | null) => {
    state.hoveredSlot = slot
  }

  return {
    containers: computed(() => state.containers),
    hoveredSlot: computed(() => state.hoveredSlot),
    setContainer,
    registerContainer,
    setContainerItems,
    getContainer,
    setContainers,
    registerSlot,
    setSlot,
    getSlot,
    setHoveredSlot,
  }
}
