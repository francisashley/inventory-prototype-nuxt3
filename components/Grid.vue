<template>
  <div class="flex flex-wrap mx-auto" :style="containerStyle">
    <item v-for="(_, i) in placeholderItems" :key="i" placeholder />
  </div>
  <draggable
    v-model="items"
    group="container"
    item-key="id"
    class="absolute top-2 bottom-2 flex flex-wrap mx-auto"
    :style="containerStyle"
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
  rows: {
    type: Number,
    default: 4,
  },
  cols: {
    type: Number,
    default: 4,
  },
})
const cols = computed(() => props.cols)
const rows = computed(() => props.rows)

const items = computed({
  get: () => props.items,
  set: (value) => emit('change', value),
})

const containerStyle = computed(() => ({ width: cols.value * 5 + 'rem' }))

const placeholderItems = computed(() => {
  const cells = rows.value * cols.value || 0
  return Array(cells).fill(null)
})
</script>
