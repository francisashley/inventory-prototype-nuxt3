<template>
  <div>
    <slot />
    <HeldItem :item="hand && !hand.isDragging ? hand.item : null" />
    <CellTooltip v-if="!hand" :cell="hoveredCell" />
  </div>
</template>

<script lang="ts" setup>
import { useInventory } from '../composables/useInventory'
import { Cell } from '../interfaces/inventory'

const emit = defineEmits(['change'])

type ContainerProps = {
  id: number
  value: Cell[]
}

const props = withDefaults(defineProps<ContainerProps>(), {
  name: null,
  value: () => [],
})

const { createContainer, updateContainer, hand, hoveredCell } = useInventory()

// initialise container
const { container } = createContainer({ ...props, cells: props.value })

// update container when props change
watch(props, () => updateContainer(props.id, { ...props, cells: props.value }))

// update container when props change
watch(container, () => emit('change', container))
</script>
