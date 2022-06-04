<template>
  <div
    ref="containerRef"
    class="relative p-2 border border-thin"
    :class="{ 'border-blue-400': theme === 'blue', 'border-red-400': theme === 'red', 'border-white': theme === null }"
  >
    <ContainerGrid :cols="cols" :items="items" @change="emit('change', { items: $event, id })" />
  </div>
</template>

<script lang="ts" setup>
import { useSizeObserver } from '@/utils/sizeObserver'

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
  theme: {
    type: String,
    default: null,
    validator: (value: any) => ['blue', 'red'].includes(value),
  },
})

const items = computed(() => props.items)
const theme = computed(() => props.theme)

const containerRef = ref(null)
const { widthRef } = useSizeObserver(containerRef)

const cols = computed(() => Math.floor(widthRef.value / 80))
</script>
