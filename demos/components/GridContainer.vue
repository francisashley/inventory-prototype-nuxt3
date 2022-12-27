<template>
  <Container
    :id="props.id"
    class="tw-relative tw-p-2 tw-border tw-border-thin tw-overflow-scroll tw-flex tw-flex-wrap tw-mx-auto"
    :class="{
      'tw-border-blue-400': props.color === 'blue',
      'tw-border-red-400': props.color === 'red',
    }"
    :style="gridContainerStyle"
    :value="props.value"
    @change="emit('change', $event)"
  >
    <slot />
  </Container>
</template>

<script lang="ts" setup>
import { ContainerSize, ContainerSlot } from '@/interfaces/inventory'

const emit = defineEmits(['change'])

type GridContainerProps = {
  id: number
  color: 'blue' | 'red'
  size: ContainerSize
  value: ContainerSlot[]
}

const props = defineProps<GridContainerProps>()

const gridContainerStyle = computed(() => {
  return {
    width: props.size[0] * 5 + 1.25 + 'rem',
    height: props.size[1] * 5 + 1.25 + 'rem',
  }
})
</script>
