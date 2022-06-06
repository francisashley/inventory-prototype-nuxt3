<template>
  <div
    class="relative p-2 border border-thin overflow-scroll"
    :class="{
      'border-blue-400': props.theme === 'blue',
      'border-red-400': props.theme === 'red',
      'border-white': props.theme === null,
    }"
    :style="containerStyle"
  >
    <div class="flex flex-wrap mx-auto">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  size: {
    type: Array,
    default: () => [8, 2],
    validator: (size) => typeof size[0] === 'number' && typeof size[1] === 'number',
  },
  theme: {
    type: String,
    default: null,
    validator: (value: any) => ['blue', 'red'].includes(value),
  },
})

const containerStyle = computed(() => ({
  width: props.size[0] * 5 + 1.25 + 'rem',
  height: props.size[1] * 5 + 1.25 + 'rem',
}))
</script>
