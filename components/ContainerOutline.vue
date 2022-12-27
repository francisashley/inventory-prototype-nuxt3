<template>
  <div :style="containerStyle">
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
})

const containerStyle = computed(() => ({
  width: props.size[0] * 5 + 1.25 + 'rem',
  height: props.size[1] * 5 + 1.25 + 'rem',
}))
</script>
