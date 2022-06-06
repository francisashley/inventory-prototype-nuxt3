import toolset from '@/utils/toolset'
import ct from '@/utils/containerTools'

import itemFixtures from '@/assets/fixtures/item-catalogue.json'
import containerFixtures from '@/assets/fixtures/containers.json'

const itemCatalogue = itemFixtures.map(toolset.catalogue.createItem)
const containers = containerFixtures.map((container) => ct(container as Container).get())

for (let i = 0; i < 12; i++) {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * itemCatalogue.length)
  const item = itemCatalogue[randomItemIndex]
  containers[0] = ct(containers[0]).depositFirstAvailableCell(item, randomAmount)
}

export default containers
