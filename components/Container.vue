<template>
  <ContainerOutline :cols="props.cols" :theme="props.theme">
    <ContainerCell v-for="(item, i) in items" :key="i" @drop="onDrop($event, i)">
      <div v-if="item" draggable="true" @dragstart.stop="onDragStart($event, { item, cell: i })">
        <slot name="item" :item="item">
          <item :item="item" />
        </slot>
      </div>
    </ContainerCell>
  </ContainerOutline>
</template>

<script lang="ts" setup>
const emit = defineEmits(['move'])

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Number,
    default: 2,
  },
  cols: {
    type: Number,
    default: 2,
  },
  theme: {
    type: String,
    default: null,
    validator: (value: any) => ['blue', 'red'].includes(value),
  },
})

const cells = computed(() => props.rows * props.cols || 0)

const items = computed(() => {
  return Array(cells.value)
    .fill(null)
    .map((cell, i) => props.items[i] || cell)
})

const onDragStart = (event, { item, cell }) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('item', JSON.stringify(item))
  event.dataTransfer.setData('containerId', props.id)
  event.dataTransfer.setData('cellId', cell)
}

const onDrop = (event, cellId) => {
  const item = JSON.parse(event.dataTransfer.getData('item'))

  const from = {
    containerId: Number(event.dataTransfer.getData('containerId')),
    cellId: Number(event.dataTransfer.getData('cellId')),
  }

  const to = {
    containerId: props.id,
    cellId,
  }

  const isMovingToAnotherCell = from.containerId + from.cellId !== to.containerId + to.cellId

  if (isMovingToAnotherCell) {
    emit('move', { item, from, to })
  }
}
</script>
