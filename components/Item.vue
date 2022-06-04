<template>
  <div class="p-1 h-20 w-20 bg-gray-900">
    <div
      v-if="placeholder"
      class="flex justify-center items-center text-white text-xs border border-thin border-gray-800 overflow-hidden p-2 relative h-full w-full"
    />
    <a
      v-else
      href="#"
      class="flex justify-center items-center text-white text-xs border border-thin border-gray-800 overflow-hidden p-2 relative h-full w-full hover:border-gray-500"
      :title="item.name"
      @click.prevent="onClick"
    >
      <template v-if="item">
        <div v-if="item.amount" class="absolute top-1 left-1 text-white bg-gray-900 px-0.5 leading-none">
          {{ item.amount }}
        </div>
        <img
          v-if="item.image"
          class="w-full h-full object-cover rounded rounded-full"
          :src="item.image"
          :alt="item.name"
        />
        <template v-else>
          {{ item.name }}
        </template>
      </template>
    </a>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  placeholder: {
    type: Boolean,
    default: false,
  },
})

const item = computed(() => props.item)

const onClick = () => {}
</script>
