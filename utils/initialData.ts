import { createItem, createContainer, addItemToContainer } from '@/utils/dataTools'

import fakeItems from '@/assets/fixtures/items.json'
import fakeContainers from '@/assets/fixtures/containers.json'

const initialItems = fakeItems.map(createItem)
const initialContainers = fakeContainers.map((container) => createContainer(container))

const randomAmount = [1, 2, 1, 10, 1, 3, 9]

for (const [i, item] of initialItems.entries()) {
  initialContainers[0] = addItemToContainer(initialContainers[0], item, { amount: randomAmount[i] || 1 })
}

export { initialItems, initialContainers }
