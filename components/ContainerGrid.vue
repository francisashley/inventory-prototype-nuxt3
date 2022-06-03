<template>
  <div class="flex flex-wrap mx-auto" :style="{ width: containerWidth }">
    <item
      v-for="(item, i) in getItems"
      :key="i"
      :item="item"
      :placeholder="!item"
    />
  </div>
</template>

<script setup>
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

const items = computed(() => props.items)
const cols = computed(() => props.cols)
const rows = computed(() => Math.ceil(items.value.length / cols.value) || 1)
const containerWidth = computed(() => cols.value * 5 + 'rem')
const cells = computed(() => rows.value * cols.value)
const getItems = computed(() => {
  const cellItems = []
  for (let i = 0; i < cells.value; i++) {
    cellItems.push(items.value[i])
  }
  return cellItems
})
</script>
