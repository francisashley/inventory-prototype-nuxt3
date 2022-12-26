<template>
  <div class="tw-min-h-screen tw-flex tw-flex-col tw-flex-1 tw-bg-gray-900">
    <div v-for="(container, i) in containers" :key="i" class="tw-mx-auto tw-mt-8">
      <button
        class="tw-rounded tw-bg-blue-600 tw-mb-2 tw-text-xs tw-text-white tw-py-1 tw-px-2"
        @click="onAddRandomItem(container.id)"
      >
        Add random item
      </button>
      <Container
        :id="container.id"
        :cells="container.cells"
        :color="container.color"
        :size="container.size"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import itemFixtures from '@/assets/fixtures/item-catalogue.json'
import containerFixtures from '@/assets/fixtures/containers.json'

import { createContainer, depositFirstAvailableCell } from '@/utils/container.utils'
import { parseItem } from '@/utils/item.utils'

const items = itemFixtures.map(parseItem)
const initialContainers = [...containerFixtures].map(createContainer)

for (let i = 0; i < 12; i++) {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  initialContainers[0] = depositFirstAvailableCell(initialContainers[0], { ...item, amount: randomAmount })
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
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = { ...items[randomItemIndex], amount: randomAmount }
  const container = findContainer(containerId)
  const updatedContainer = depositFirstAvailableCell(container, item)
  replaceContainer(containerId, updatedContainer)
}
</script>
