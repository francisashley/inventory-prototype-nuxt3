<template>
  <div
    class="relative p-2 border border-thin"
    :class="{
      'border-blue-400': props.theme === 'blue',
      'border-red-400': props.theme === 'red',
      'border-white': props.theme === null,
    }"
  >
    <div class="flex flex-wrap mx-auto" :style="containerStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
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

const containerStyle = computed(() => ({ width: props.cols * 5 + 'rem' }))
</script>
