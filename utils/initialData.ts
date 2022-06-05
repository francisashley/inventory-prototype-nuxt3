import toolset from '@/utils/toolset'

import itemFixtures from '@/assets/fixtures/item-catalogue.json'
import containerFixtures from '@/assets/fixtures/containers.json'

const itemCatalogue = itemFixtures.map(toolset.createItem)
const containers = containerFixtures.map((container) => toolset.createContainer(container as looseContainer))

for (let i = 0; i < 12; i++) {
  const amount = Math.floor(Math.random() * 10)
  const item = itemCatalogue[Math.floor(Math.random() * itemCatalogue.length)]
  containers[0] = toolset.container(containers[0]).appendItem({ ...item, amount })
}

export default containers
