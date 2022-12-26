<template>
  <div
    class="tw-p-1 tw-h-20 tw-w-20 tw-bg-gray-900"
    @mouseenter="emit('hover')"
    @mousedown="emit('hoverLeave')"
    @mouseleave="emit('hoverLeave')"
  >
    <div class="tw-border tw-border-thin tw-border-gray-800 tw-relative tw-h-full tw-w-full">
      <div
        class="tw-absolute -tw-inset-px"
        @dragenter.prevent="setIsHovering(true)"
        @dragover.prevent
        @dragleave="setIsHovering(false)"
        @drop="setIsHovering(false)"
      >
        <div draggable="true" @dragstart.stop="onDrag($event)">
          <slot />
        </div>
      </div>
      <div
        v-if="isHovering"
        class="tw-absolute -tw-inset-px tw-pointer-events-none tw-border tw-border-thin tw-border-gray-500"
        :class="{ 'tw-opacity-40': isHovering, 'tw-bg-gray-700': isHovering }"
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

const emit = defineEmits(['drag', 'hover', 'hoverLeave'])

const isHovering = ref(false)
const setIsHovering = (value: boolean) => {
  isHovering.value = value
}

const onDrag = (event) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  emit('drag', props.path)
}
</script>
