<template>
  <ContainerOutline :size="props.size" :color="props.color">
    <ContainerCell
      v-for="cell in container.cells"
      :key="cell.id"
      :draggable="Boolean(cell.item)"
      :path="[id, cell.id]"
      @mousedown="onMouseleaveCell()"
      @dragstart="onDragStart($event, cell.amount)"
      @drop="onDrop(cell.id)"
      @mouseenter="onMouseoverCell(cell)"
      @mouseleave="onMouseleaveCell()"
    >
      <item v-if="cell.item" :item="cell.item" :amount="cell.amount" />
    </ContainerCell>
    <CellTooltip :cell="hoveredCell" />
  </ContainerOutline>
</template>

<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi'
import { useInventory } from '../composables/useInventory'
import { Cell } from '../interfaces/inventory'

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

const emit = defineEmits(['change'])

// state
const { initContainer, updateContainer, containers, move, swap, findCell, hand, setHand, clearHand } = useInventory()

const hoveredCell = ref(null)

initContainer(props)
watch(props, () => {
  updateContainer(props.id, props)
})

// actual container
const container = computed(() => {
  return containers.value.find((container) => container.id === props.id)
})

// callbacks
const onDragStart = (path, amount) => {
  setHand(path, amount)
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

const onMouseoverCell = (cell) => {
  if (cell.item) {
    hoveredCell.value = cell
  }
}

const onMouseleaveCell = () => {
  hoveredCell.value = null
}
</script>
