<template>
  <div class="min-h-screen flex flex-col flex-1 bg-gray-900">
    <div v-for="({ id, items, theme }, i) in getContainers" :key="i" class="mx-auto mt-8">
      <Container :id="id" :items="items" :theme="theme" :rows="2" :cols="8" @change="onChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createItem, findItemById, createContainer, addItemToContainer } from '@/utils/dataTools'

import fakeItems from '@/assets/data/items.json'
import fakeContainers from '@/assets/data/containers.json'

const initialItems = fakeItems.map(createItem)
const initialContainers = fakeContainers.map((container) => createContainer(container))

for (const [i, item] of initialItems.entries()) {
  initialContainers[0] = addItemToContainer(initialContainers[0], item, { amount: i })
}

const items = ref(initialItems)
const containers = ref(initialContainers)

const getContainers = computed(() => {
  return [...containers.value].map((container) => {
    return {
      ...container,
      items: [...container.items].map((item) => ({
        ...item,
        ...findItemById(items.value, item.id),
      })),
    }
  })
})

const onChange = ({ items, id }) => {
  containers.value = containers.value.map((container) => {
    return {
      ...container,
      items: container.id === id ? items : container.items,
    }
  })
}
</script>
