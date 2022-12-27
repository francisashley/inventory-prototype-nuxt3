<template>
  <div :style="containerStyle">
    <div class="tw-flex tw-flex-wrap tw-mx-auto">
      <ContainerSlot v-for="cell in container.cells" :key="cell.id" :path="cell.path">
        <Item v-if="cell.item" :item="cell.item" />
      </ContainerSlot>
      <HeldItem :item="hand && !hand.isDragging ? hand.item : null" />
      <CellTooltip v-if="!hand" :cell="hoveredCell" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useInventory } from '../composables/useInventory'
import { Cell } from '../interfaces/inventory'

type ContainerProps = {
  id: number
  name?: string
  cells: Cell[]
  size: [number, number]
}

const props = withDefaults(defineProps<ContainerProps>(), {
  name: null,
  cells: () => [],
  size: () => [8, 2],
})

const { createContainer, updateContainer, hand, hoveredCell } = useInventory()

// initialise container
const { container } = createContainer(props)

// update container when props change
watch(props, () => updateContainer(props.id, props))

const containerStyle = computed(() => ({
  width: props.size[0] * 5 + 1.25 + 'rem',
  height: props.size[1] * 5 + 1.25 + 'rem',
}))
</script>
