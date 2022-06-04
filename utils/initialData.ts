import { createItem, createContainer, addItemToContainer } from '@/utils/dataTools'

import fakeItems from '@/assets/fixtures/items.json'
import fakeContainers from '@/assets/fixtures/containers.json'

const initialItems = fakeItems.map(createItem)
const initialContainers = fakeContainers.map((container) => createContainer(container))

for (const [i, item] of initialItems.entries()) {
  initialContainers[0] = addItemToContainer(initialContainers[0], item, { amount: i })
}

export { initialItems, initialContainers }
