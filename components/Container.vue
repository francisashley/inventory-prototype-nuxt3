<template>
  <ContainerOutline :size="props.size" :color="props.color">
    <ContainerCell
      v-for="cell in props.cells"
      :key="cell.id"
      :draggable="Boolean(cell.item)"
      :path="[id, cell.id]"
      @mousedown="onMouseleaveCell()"
      @dragstart="onDragStart($event, cell.amount)"
      @drop="onDrop(cell.id)"
    >
      <item
        v-if="cell.item"
        :item="cell.item"
        :amount="cell.amount"
        @mouseenter="onMouseoverCell(cell)"
        @mouseleave="onMouseleaveCell()"
      />
    </ContainerCell>
  </ContainerOutline>
</template>

<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi'
import { useState } from '../composables/state'

const emit = defineEmits(['move', 'mouseover-cell', 'mouseleave-cell'])

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

const { payload, setPayload, clearPayload } = useState('default')

const onDrop = (cellId) => {
  const from = payload.value.from

  const to = [props.id, cellId]

  const isMovingCell = from + '' !== to + ''

  if (isMovingCell) {
    emit('move', { from, to })
  }

  clearPayload()
}

const onMouseoverCell = (cell) => {
  emit('mouseover-cell', cell)
}

const onMouseleaveCell = () => {
  emit('mouseleave-cell')
}

const onDragStart = (path, amount) => {
  setPayload(path, amount)
}
</script>
