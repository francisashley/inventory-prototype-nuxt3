<template>
  <div class="flex flex-wrap mx-auto" :style="{ width: containerWidth }">
    <item v-for="(_, i) in placeholderItems" :key="i" placeholder />
  </div>
  <draggable
    v-model="items"
    group="container"
    item-key="id"
    class="absolute top-2 bottom-2 flex flex-wrap mx-auto"
    :style="{ width: containerWidth }"
  >
    <template #item="{ element }">
      <item :item="element" :placeholder="!element" />
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'

const emit = defineEmits(['change'])

// Props
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  cols: {
    type: Number,
    default: 4,
  },
})

const items = computed({
  get: () => props.items,
  set: (value) => emit('change', value),
})
const cols = computed(() => props.cols)
const rows = computed(() => {
  const rows = Math.ceil(items.value.length / cols.value) || 2
  return rows > 2 ? rows : 2
})
const containerWidth = computed(() => cols.value * 5 + 'rem')
const placeholderItems = computed(() => {
  const cells = rows.value * cols.value || 0
  return Array(cells).fill(null)
})
</script>
