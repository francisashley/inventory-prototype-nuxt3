import { reactive } from 'vue'
import itemFixtures from '@/assets/fixtures/item-catalogue.json'
import { createItem } from '@/utils/item.utils'
import { Item, ContainerSize, ContainerSlot } from '@/interfaces/inventory'
import { getRandomItem, generateSlots } from '@/utils/demo.utils'
import { generateId } from '@/utils/id.utils'
import containerFixtures from '@/assets/fixtures/containers.json'
import { depositFirstAvailableSlot } from '@/utils/container.utils'

type DemoContainer = {
  id: number
  color: string
  slots: ContainerSlot[]
  size: ContainerSize
}

const state = reactive<{ itemRegistry: Item[]; demoContainers: DemoContainer[] }>({
  itemRegistry: [],
  demoContainers: [],
})

state.itemRegistry = itemFixtures.map(createItem)

state.demoContainers = containerFixtures.map(({ color, size }: { color: string; size: ContainerSize }, i) => {
  const id = generateId()
  let slots = generateSlots(id, size, [])

  if (i === 0) {
    for (let i = 0; i < 12; i++) {
      const item = getRandomItem(state.itemRegistry)
      slots = depositFirstAvailableSlot(slots, item)
    }
  }

  return { id, color, slots, size }
})

export function useDemo() {
  const demoContainers = computed(() => state.demoContainers)

  const setDemoContainers = (demoContainers: DemoContainer[]) => {
    state.demoContainers = demoContainers
  }

  const generateRandomItem = () => {
    return getRandomItem(state.itemRegistry)
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
