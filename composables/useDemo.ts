import { reactive } from 'vue'
import itemFixtures from '@/assets/fixtures/items.json'
import containerFixtures from '@/assets/fixtures/containers.json'
import { Item, ContainerSlot, ID, ValueItem } from '@/interfaces/inventory'
import {
  getRandomItem,
  getRandomItems,
  depositFirstAvailableSlot,
  createItem,
  createContainer,
} from '@/utils/demo.utils'

type DemoContainer = {
  id: ID
  color: 'blue' | 'red'
  slots: ContainerSlot[]
  items: ValueItem[]
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

state.demoContainers = containerFixtures
  .map((c) => createContainer(c))
  .map((container: DemoContainer, i: number) => {
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

  const addRandomItem = (containerId: ID) => {
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
