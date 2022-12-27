import { reactive } from 'vue'
import itemFixtures from '@/assets/fixtures/item-catalogue.json'
import { createItem } from '@/utils/item.utils'
import { Item } from '@/interfaces/inventory'
import { getRandomItem } from '@/utils/demo.utils'

const state = reactive<{ itemRegistry: Item[] }>({
  itemRegistry: [],
})

state.itemRegistry = itemFixtures.map(createItem)

export function useDemo() {
  const generateRandomItem = () => {
    return getRandomItem(state.itemRegistry)
  }

  return {
    generateRandomItem,
  }
}
