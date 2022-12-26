<template>
  <ContainerOutline :size="props.size" :color="props.color">
    <ContainerCell
      v-for="cell in container.cells"
      :key="cell.id"
      :draggable="Boolean(cell.item)"
      :path="cell.path"
      @dragstart="onDragStart($event, cell)"
      @drop="onDrop(cell.id)"
      @mouseenter="setHoveredCell(cell.item ? cell : null)"
      @mousedown="setHoveredCell(null)"
      @mouseleave="setHoveredCell(null)"
    >
      <Item v-if="cell.item" :item="cell.item" />
    </ContainerCell>
    <CellTooltip :cell="hoveredCell" />
  </ContainerOutline>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useInventory } from '../composables/useInventory'
import { Cell } from '../interfaces/inventory'

const emit = defineEmits(['change'])

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  cells: {
    type: Array as PropType<Cell[]>,
    default: () => [],
  },
  size: {
    type: Array,
    default: () => [8, 2],
    validator: (size) => typeof size[0] === 'number' && typeof size[1] === 'number',
  },
  color: {
    type: String,
    default: null,
    validator: (value: any) => ['blue', 'red', 'white'].includes(value),
  },
})

const {
  createContainer,
  updateContainer,
  containers,
  move,
  swap,
  findCell,
  hand,
  setHand,
  clearHand,
  hoveredCell,
  setHoveredCell,
} = useInventory()

// initialise container
const { container } = createContainer(props)

// actual container
const container = computed(() => {
  return containers.value.find((container) => container.id === props.id)
})

// callbacks
const onDragStart = (path, cell) => {
  setHand(path, cell.item.amount)
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
