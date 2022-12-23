<template>
  <div class="p-1 h-20 w-20 bg-gray-900">
    <div class="border border-thin border-gray-800 relative h-full w-full">
      <div
        class="absolute -inset-px"
        @dragenter.prevent="onDragEnter"
        @dragover.prevent
        @dragleave="onDragLeave"
        @drop="onDrop"
      >
        <div draggable="true" @dragstart.stop="onDragStart($event)" @dragend.stop="onDragEnd($event)">
          <slot />
        </div>
      </div>
      <div
        v-if="isHovering"
        class="absolute -inset-px pointer-events-none border border-thin border-gray-500"
        :class="{ 'opacity-40': isHovering, 'bg-gray-700': isHovering }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  path: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['dragstart', 'dragend'])

const isHovering = ref(false)

const onDragEnter = () => {
  isHovering.value = true
}

const onDragLeave = () => {
  isHovering.value = false
}

const onDrop = () => {
  isHovering.value = false
}

const onDragStart = (event) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  emits('dragstart', props.path)
}

const onDragEnd = () => {
  emits('dragend', props.path)
}
</script>
