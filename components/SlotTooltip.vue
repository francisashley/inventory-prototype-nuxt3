<template>
  <div
    v-if="stagedItem"
    class="tw-pointer-events-none tw-fixed tw-flex tw-text-white tw-text-xs tw-p-2 tw-bg-black"
    :style="style"
    :class="{
      transition: closing,
      'tw-opacity-0': closing,
      'tw-opacity-100': !closing,
    }"
  >
    {{ stagedItem.amount }} x {{ stagedItem.name }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
})

const position = ref({ x: 0, y: 0 })
const stagedItem = ref(props.item)
const closing = ref(false)

onMounted(() => {
  window.addEventListener('mousemove', (event) => {
    position.value = { x: event.pageX, y: event.pageY }
  })
})

const style = computed(() => ({
  left: position.value.x + 12 + 'px',
  top: position.value.y + 12 + 'px',
}))

watch(props, () => {
  if (props.item) {
    stagedItem.value = props.item
  } else {
    closing.value = true
    const slotIdBeingClosed = stagedItem.value?.id
    setTimeout(() => {
      closing.value = false
      if (!stagedItem.value || stagedItem.value.id === slotIdBeingClosed) {
        stagedItem.value = null
      }
    }, 300)
  }
})
</script>
