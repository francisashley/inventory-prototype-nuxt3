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

import ct from '@/utils/container.utils'
import { parseItem } from '@/utils/item.utils'

// Generate initial data
const items = itemFixtures.map(parseItem)
let initialContainers = ct(containerFixtures as Container[]).get()

for (let i = 0; i < 12; i++) {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  initialContainers = ct(initialContainers).depositFirstAvailableCell([initialContainers[0].id], item, randomAmount)
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
  containers.value = ct(containers.value).depositFirstAvailableCell([containerId], item, randomAmount)
}
</script>
