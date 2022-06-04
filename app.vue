<template>
  <div class="min-h-screen flex flex-col flex-1 bg-gray-900">
    <div v-for="({ id, items, theme }, i) in containers" :key="i" class="mx-auto mt-8">
      <Container :id="id" :items="items" :theme="theme" :rows="2" :cols="8" @change="onChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import fakeItems from '@/assets/data/items.json'
import { createItem } from '@/utils/dataTools'

const items = fakeItems.map(createItem)

const containers = ref([
  { id: 1, name: 'Container A', theme: 'blue', items },
  { id: 2, name: 'Container B', theme: 'red', items: [] },
])

const onChange = ({ items, id }) => {
  containers.value = containers.value.map((container) => {
    return {
      ...container,
      items: container.id === id ? items : container.items,
    }
  })
}
</script>
