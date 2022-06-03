<template>
  <div
    class="absolute w-4 h-4 border-medium"
    :class="{
      'top-0 border-t': ['tl', 'tr'].includes(corner),
      'right-0 border-r': ['tr', 'br'].includes(corner),
      'bottom-0 border-b': ['bl', 'br'].includes(corner),
      'left-0 border-l': ['tl', 'bl'].includes(corner),
      'rounded-tl': corner === 'tl',
      'rounded-tr': corner === 'tr',
      'rounded-br': corner === 'br',
      'rounded-bl': corner === 'bl',
      'border-blue-400': theme === 'blue',
      'border-red-400': theme === 'red',
      'border-white': theme === null,
    }"
  />
</template>

<script setup>
const { corner } = defineProps({
  corner: {
    type: String,
    default: 'tl',
    validator: (value) => ['tl', 'tr', 'bl', 'br'].includes(value),
  },
  theme: {
    type: String,
    default: null,
    validator: (value) => ['blue', 'red'].includes(value),
  },
})
</script>
