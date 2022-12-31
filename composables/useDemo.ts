import { reactive } from 'vue'
import itemFixtures from '@/assets/fixtures/items.json'
import containerFixtures from '@/assets/fixtures/containers.json'
import { Item, ContainerSize, ContainerSlot } from '@/interfaces/inventory'
import { getRandomItem, depositFirstAvailableSlot, createItem, createContainer } from '@/utils/demo.utils'

type DemoContainer = {
  id: number
  color: 'blue' | 'red'
  slots: ContainerSlot[]
  size: ContainerSize
}

interface DemoState {
  items: Item[]
  demoContainers: DemoContainer[]
}

const state = reactive<DemoState>({
  items: [],
  demoContainers: [],
})

state.items = itemFixtures.map(createItem)

state.demoContainers = containerFixtures.map(createContainer).map((container, i) => {
  if (i === 0) {
    for (let i = 0; i < 12; i++) {
      const item = getRandomItem(state.items)
      container = {
        ...container,
        slots: depositFirstAvailableSlot(container.slots, item),
      }
    }
  }
  return container
})

export function useDemo() {
  const demoContainers = computed(() => state.demoContainers)

  const setDemoContainers = (demoContainers: DemoContainer[]) => {
    state.demoContainers = demoContainers
  }

  const generateRandomItem = () => {
    return getRandomItem(state.items)
  }

  const addRandomItem = (containerId: number) => {
    const updatedDemoContainers = demoContainers.value.map((demoContainer) => {
      if (demoContainer.id === containerId) {
        const item = generateRandomItem()
        return {
          ...demoContainer,
          slots: depositFirstAvailableSlot(demoContainer.slots, item),
        }
      }
      return demoContainer
    })
    setDemoContainers(updatedDemoContainers)
  }

  return {
    demoContainers,
    setDemoContainers,
    generateRandomItem,
    addRandomItem,
  }
}
