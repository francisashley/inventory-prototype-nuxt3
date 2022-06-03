<template>
  <div ref="containerRef" class="relative p-2">
    <!--CORNERS-->
    <ContainerCorner corner="tl" :theme="theme" />
    <ContainerCorner corner="tr" :theme="theme" />
    <ContainerCorner corner="bl" :theme="theme" />
    <ContainerCorner corner="br" :theme="theme" />
    <!--GRID-->
    <ContainerGrid :cols="cols" :items="items" />
  </div>
</template>

<script setup>
import { useSizeObserver } from '@/utils/sizeObserver'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  theme: {
    type: String,
    default: null,
    validator: (value) => ['blue', 'red'].includes(value),
  },
})

const items = computed(() => props.items)
const theme = computed(() => props.theme)

const containerRef = ref(null)
const { widthRef } = useSizeObserver(containerRef)

const cols = computed(() => Math.floor(widthRef.value / 80))
</script>
