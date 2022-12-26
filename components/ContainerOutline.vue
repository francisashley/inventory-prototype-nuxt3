<template>
  <div
    class="tw-relative tw-p-2 tw-border tw-border-thin tw-overflow-scroll"
    :class="{
      'tw-border-blue-400': props.color === 'blue',
      'tw-border-red-400': props.color === 'red',
      'tw-border-white': props.color === null,
    }"
    :style="containerStyle"
  >
    <div class="tw-flex tw-flex-wrap tw-mx-auto">
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
  color: {
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
