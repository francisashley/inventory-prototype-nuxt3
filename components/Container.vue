<template>
  <div ref="containerRef" class="relative p-2">
    <!--CORNERS-->
    <ContainerCorner corner="tl" :theme="theme" />
    <ContainerCorner corner="tr" :theme="theme" />
    <ContainerCorner corner="bl" :theme="theme" />
    <ContainerCorner corner="br" :theme="theme" />
    <!--GRID-->
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
