<template>
  <button class="tw-rounded tw-bg-blue-600 tw-mb-2 tw-text-xs tw-text-white tw-py-1 tw-px-2">{{ props.text }}</button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text?: string
}>()
</script>
