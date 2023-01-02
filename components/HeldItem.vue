<template>
  <div
    class="tw-pointer-events-none tw-fixed tw-flex tw-text-white tw-text-xs tw-flex tw-text-white tw-text-xs tw-p-2 tw-h-12 tw-w-12 tw-bg-black -tw-top-4 -tw-left-4 tw-z-10 tw-hidden"
    :class="{ '!tw-block': canShow }"
    :style="style"
  >
    <div class="tw-absolute tw-bottom-0.5 tw-left-0 tw-text-white tw-px-0.5 tw-leading-none tw-text-shadow">
      {{ props.item?.amount }}
    </div>
    <img
      v-if="props.item?.image"
      class="tw-w-full tw-h-full tw-object-cover tw-rounded tw-rounded-full tw-pointer-events-none"
      :src="props.item?.image"
      :alt="props.item?.name"
    />
    <template v-else>
      {{ props.item?.name }}
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => null,
  },
})

const position = ref({ x: 0, y: 0 })

onMounted(() => {
  window.addEventListener('mousemove', (event) => {
    position.value = { x: event.pageX, y: event.pageY }
  })
})

const style = computed(() => ({
  left: position.value.x + 12 + 'px',
  top: position.value.y + 12 + 'px',
}))

const canShow = computed(() => Boolean(props.item))
</script>
