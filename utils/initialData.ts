import toolset from '@/utils/toolset'

import fakeItems from '@/assets/fixtures/item-catalogue.json'
import fakeContainers from '@/assets/fixtures/containers.json'

const initialItems = fakeItems.map(toolset.createItem)
const initialContainers = fakeContainers.map((container) => toolset.createContainer(container as looseContainer))

const amounts = [1, 2, 1, 10, 1, 3, 9]

for (const [i, item] of initialItems.entries()) {
  initialContainers[0] = toolset.container(initialContainers[0]).appendItem({ ...item, amount: amounts[i] || 1 })
  initialContainers[0] = toolset.container(initialContainers[0]).appendItem({ ...item, amount: amounts[i] || 1 })
}

export { initialItems, initialContainers }
