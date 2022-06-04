<template>
  <div class="min-h-screen flex flex-col flex-1 bg-gray-900">
    <div v-for="({ id, items, theme }, i) in getEnrichedContainers" :key="i" class="mx-auto mt-8">
      <Container :id="id" :items="items" :theme="theme" :rows="2" :cols="8" @change="onChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findItemById } from '@/utils/dataTools'
import { initialItems, initialContainers } from '@/utils/initialData'

const items = ref(initialItems)
const containers = ref(initialContainers)

const getEnrichedContainers = computed(() => {
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
