<template>
  <div
    ref="containerRef"
    class="relative p-2 border border-thin"
    :class="{ 'border-blue-400': theme === 'blue', 'border-red-400': theme === 'red', 'border-white': theme === null }"
  >
    <ContainerGrid :cols="cols" :rows="rows" :items="items" @change="emit('change', { items: $event, id })" />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['change'])

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Number,
    default: 2,
  },
  cols: {
    type: Number,
    default: 2,
  },
  theme: {
    type: String,
    default: null,
    validator: (value: any) => ['blue', 'red'].includes(value),
  },
})

const items = computed(() => props.items)
const theme = computed(() => props.theme)
const rows = computed(() => props.rows)
const cols = computed(() => props.cols)
</script>
