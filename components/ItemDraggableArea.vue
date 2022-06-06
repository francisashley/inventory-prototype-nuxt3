<template>
  <div draggable="true" @dragstart.stop="onDragStart($event)">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  containerId: {
    type: Number,
    required: true,
  },
  cellId: {
    type: Number,
    required: true,
  },
  itemId: {
    type: Number,
    required: true,
  },
})

const onDragStart = (event) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('containerId', props.containerId)
  event.dataTransfer.setData('cellId', props.cellId)
  event.dataTransfer.setData('item', props.itemId)
}
</script>
