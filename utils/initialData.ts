import toolset from '@/utils/toolset'

import itemCatalogue from '@/assets/fixtures/item-catalogue.json'
import fakeContainers from '@/assets/fixtures/containers.json'

const initialItems = itemCatalogue.map(toolset.createItem)
const initialContainers = fakeContainers.map((container) => toolset.createContainer(container as looseContainer))

for (const item of initialItems) {
  const amount = Math.floor(Math.random() * 10)
  initialContainers[0] = toolset.container(initialContainers[0]).appendItem({ ...item, amount })
}

export { initialItems, initialContainers }
