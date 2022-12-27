<template>
  <div v-for="(container, i) in containers" :key="i" class="tw-mx-auto tw-mt-8">
    <AddItemButton @click="onAddRandomItem(container.id)" />
    <Container
      :id="container.id"
      :cells="container.cells"
      :color="container.color"
      :size="container.size"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AddItemButton from './components/AddItemButton.vue'

import itemFixtures from '@/assets/fixtures/item-catalogue.json'
import containerFixtures from '@/assets/fixtures/containers.json'

import { createContainer, depositFirstAvailableCell } from '@/utils/container.utils'
import { createItem } from '@/utils/item.utils'
import { getRandomItem } from '@/utils/demo.utils'

const items = itemFixtures.map(createItem)
const initialContainers = [...containerFixtures].map(createContainer)

for (let i = 0; i < 12; i++) {
  const item = getRandomItem(items)
  initialContainers[0].cells = depositFirstAvailableCell(initialContainers[0].cells, item)
}

const containers = ref(initialContainers)

const findContainer = (id) => {
  return containers.value.find((container) => container.id === id)
}

const replaceContainer = (id, container) => {
  containers.value = containers.value.map((c) => (c.id === id ? container : c))
}

const onChange = (updatedContainer) => {
  replaceContainer(updatedContainer.id, updatedContainer)
}

const onAddRandomItem = (containerId: number) => {
  const item = getRandomItem(items)
  const container = findContainer(containerId)
  container.cells = depositFirstAvailableCell(container.cells, item)
  replaceContainer(containerId, container)
}
</script>
