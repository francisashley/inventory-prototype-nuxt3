<template>
  <ContainerOutline :size="props.size" :color="props.color">
    <ContainerSlot
      v-for="cell in container.cells"
      :key="cell.id"
      :path="cell.path"
      :draggable="Boolean(cell.item)"
      @drag="onDrag(cell)"
      @drop="onDrop(cell.id)"
      @hover="setHoveredCell(cell.item ? cell : null)"
      @hoverLeave="setHoveredCell(null)"
    >
      <Item v-if="cell.item" :item="cell.item" />
    </ContainerSlot>
    <HeldItem :item="hand && !hand.isDragging ? hand.item : null" />
    <CellTooltip v-if="!hand" :cell="hoveredCell" />
  </ContainerOutline>
</template>

<script lang="ts" setup>
import { useInventory } from '../composables/useInventory'
import { Cell } from '../interfaces/inventory'

const emit = defineEmits(['change'])

type ContainerProps = {
  id: number
  name?: string
  cells: Cell[]
  size: [number, number]
  color?: 'blue' | 'red' | 'white'
}

const props = withDefaults(defineProps<ContainerProps>(), {
  name: null,
  cells: () => [],
  size: () => [8, 2],
  color: null,
})

const { createContainer, updateContainer, move, swap, findCell, hand, pickup, clearHand, hoveredCell, setHoveredCell } =
  useInventory()

// initialise container
const { container } = createContainer(props)

// callbacks
const onDrag = (cell) => {
  pickup(cell.path, cell.item.amount, true)
}

const onDrop = (cellId) => {
  const from = hand.value.from
  const to = [props.id, cellId]

  const fromCell = findCell(from)
  const toCell = findCell(to)

  if (
    typeof fromCell.item !== 'undefined' &&
    typeof toCell.item !== 'undefined' &&
    fromCell.item?.id === toCell.item?.id
  ) {
    move(from, to)
  } else {
    swap(from, to)
  }

  clearHand()
  emit('change', container.value)
}
// update container when props change
watch(props, () => updateContainer(props.id, props))
</script>
