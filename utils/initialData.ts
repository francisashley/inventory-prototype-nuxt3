import toolset from '@/utils/toolset'

import itemFixtures from '@/assets/fixtures/item-catalogue.json'
import containerFixtures from '@/assets/fixtures/containers.json'

const itemCatalogue = itemFixtures.map(toolset.catalogue.createItem)
const containers = containerFixtures.map((container) => toolset.container(container as Container).create())

for (let i = 0; i < 12; i++) {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * itemCatalogue.length)
  const item = itemCatalogue[randomItemIndex]
  containers[0] = toolset.container(containers[0]).depositFirstAvailableCell(item, randomAmount)
}

export default containers
