<template>
  <Container
    :id="props.id"
    :class="[
      'tw-relative tw-p-2 tw-border tw-border-thin tw-overflow-scroll tw-flex tw-flex-wrap tw-mx-auto',
      { 'tw-border-blue-400': props.color === 'blue', 'tw-border-red-400': props.color === 'red' },
    ]"
    :value="props.value"
    @change="emit('change', $event)"
  >
    <slot />
  </Container>
</template>

<script lang="ts" setup>
import { ContainerSlot } from '@/interfaces/inventory'

const emit = defineEmits(['change'])

type GridContainerProps = {
  id: number
  color: 'blue' | 'red'
  value: ContainerSlot[]
}

const props = defineProps<GridContainerProps>()
</script>
