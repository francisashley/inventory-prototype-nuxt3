<template>
  <ContainerOutline :size="props.size" :theme="props.theme">
    <ContainerCell
      v-for="cell in props.cells"
      :key="cell.id"
      :draggable="Boolean(cell.item)"
      :path="[id, cell.id]"
      @drop="onDrop($event, cell.id)"
    >
      <item v-if="cell.item" :item="cell.item" :amount="cell.amount" />
    </ContainerCell>
  </ContainerOutline>
</template>

<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi'

const emit = defineEmits(['move'])

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
  theme: {
    type: String,
    default: null,
    validator: (value: any) => ['blue', 'red', 'white'].includes(value),
  },
})

const onDrop = (event, cellId) => {
  const from = JSON.parse(event.dataTransfer.getData('path'))

  const to = [props.id, cellId]

  const isMovingCell = from + '' !== to + ''

  if (isMovingCell) {
    emit('move', { from, to })
  }
}
</script>
