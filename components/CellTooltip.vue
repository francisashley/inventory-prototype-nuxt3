<template>
  <div
    v-if="stagedCell"
    class="tw-pointer-events-none tw-fixed tw-flex tw-text-white tw-text-xs tw-p-2 tw-bg-black"
    :style="style"
    :class="{
      transition: closing,
      'tw-opacity-0': closing,
      'tw-opacity-100': !closing,
    }"
  >
    {{ stagedCell.item.amount }} x {{ stagedCell.item.name }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  cell: {
    type: Object,
    default: null,
  },
})

const position = ref({ x: 0, y: 0 })
const stagedCell = ref(props.cell)
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
  if (props.cell) {
    stagedCell.value = props.cell
  } else {
    closing.value = true
    const cellIdBeingClosed = stagedCell.value?.id
    setTimeout(() => {
      closing.value = false
      if (!stagedCell.value || stagedCell.value.id === cellIdBeingClosed) {
        stagedCell.value = null
      }
    }, 300)
  }
})
</script>
