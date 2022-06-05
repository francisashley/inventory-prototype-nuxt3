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
        <slot />
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
const isHovering = ref(false)
const onDragEnter = () => {
  isHovering.value = true
}
const onDragLeave = () => {
  isHovering.value = false
}
const onDrop = (event) => {
  isHovering.value = false
}
</script>
