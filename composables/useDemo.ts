import { reactive } from 'vue'
import itemFixtures from '@/assets/fixtures/items.json'
import containerFixtures from '@/assets/fixtures/containers.json'
import { Item, ContainerSize, ContainerSlot } from '@/interfaces/inventory'
import {
  getRandomItem,
  getRandomItems,
  depositFirstAvailableSlot,
  createItem,
  createContainer,
} from '@/utils/demo.utils'

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

state.demoContainers = containerFixtures.map(createContainer).map((container: DemoContainer, i: number) => {
  if (i === 0) {
    const randomItems = getRandomItems(state.items, 12)
    let slots = container.slots
    for (const item of randomItems) {
      slots = depositFirstAvailableSlot(slots, item)
    }
    container = { ...container, slots }
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
