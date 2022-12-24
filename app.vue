<template>
  <div class="min-h-screen flex flex-col flex-1 bg-gray-900">
    <div v-for="(container, i) in containers" :key="i" class="mx-auto mt-8">
      <button class="rounded bg-blue-600 mb-2 text-xs text-white py-1 px-2" @click="onAddRandomItem(container.id)">
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

import { parseContainer, depositFirstAvailableCell } from '@/utils/container.utils'
import { parseItem } from '@/utils/item.utils'

const items = itemFixtures.map(parseItem)
const initialContainers = [...containerFixtures].map(parseContainer)

for (let i = 0; i < 12; i++) {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  initialContainers[0] = depositFirstAvailableCell(initialContainers[0], item, randomAmount)
}

const containers = ref(initialContainers)

const onChange = (changedContainer) => {
  containers.value = containers.value.map((container) =>
    container.id === changedContainer.id ? changedContainer : container
  )
}

const onAddRandomItem = (containerId: number) => {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  containers.value = containers.value.map((container) => {
    return container.id === containerId ? depositFirstAvailableCell(container, item, randomAmount) : container
  })
}
</script>
