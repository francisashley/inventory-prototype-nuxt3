<template>
  <div
    class="flex text-white text-xs border border-thin p-2 relative h-18 w-18 border-gray-800 hover:border-gray-500 bg-gray-800"
  >
    <div class="absolute top-0.5 left-0 text-white bg-gray-800 px-0.5 leading-none">
      {{ props.amount }}
    </div>
    <img
      v-if="props.item.image"
      class="w-full h-full object-cover rounded rounded-full pointer-events-none"
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
  amount: {
    type: Number,
    default: 1,
  },
})
</script>
