<template>
  <div>
    <ContainerSlot v-for="cell in container.cells" :key="cell.id" :path="cell.path" @change="onChange" />
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
  cells: Cell[]
}

const props = withDefaults(defineProps<ContainerProps>(), {
  name: null,
  cells: () => [],
})

const { createContainer, updateContainer, hand, hoveredCell } = useInventory()

// initialise container
const { container } = createContainer(props)

// update container when props change
watch(props, () => updateContainer(props.id, props))

const onChange = () => {
  emit('change', container)
}
</script>
