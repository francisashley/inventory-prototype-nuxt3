<template>
  <div
    class="tw-flex tw-text-white tw-text-xs tw-border tw-border-thin tw-p-2 tw-relative tw-h-18 tw-w-18 tw-border-gray-800 hover:tw-border-gray-500 tw-bg-gray-800"
  >
    <div class="tw-absolute tw-top-0.5 tw-left-0 tw-text-white tw-bg-gray-800 tw-px-0.5 tw-leading-none">
      {{ props.item.amount }}
    </div>
    <img
      v-if="props.item.image"
      class="tw-w-full tw-h-full tw-object-cover tw-rounded tw-rounded-full tw-pointer-events-none"
      :src="props.item.image"
      :alt="props.item.name"
    />
    <template v-else>
      {{ props.item.name }}
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>
