<template>
  <div
    class="tw-p-1 tw-h-20 tw-w-20 tw-bg-gray-900"
    @mouseenter="emit('hover')"
    @mousedown="emit('hoverLeave')"
    @mouseleave="emit('hoverLeave')"
    @click="onLeftClick"
    @contextmenu="onRightClick"
  >
    <div class="tw-border tw-border-thin tw-border-gray-800 tw-relative tw-h-full tw-w-full tw-select-none">
      <div
        class="tw-absolute -tw-inset-px"
        @dragenter.prevent="setIsHovering(true)"
        @dragover.prevent
        @dragleave="setIsHovering(false)"
        @drop="setIsHovering(false)"
      >
        <div draggable="true" @dragstart.stop="onDrag($event)">
          <slot />
        </div>
        <div
          v-if="isHovering"
          class="tw-absolute -tw-inset-px tw-pointer-events-none tw-border tw-border-thin tw-border-gray-500"
          :class="{ 'tw-opacity-40': isHovering, 'tw-bg-gray-700': isHovering }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useInventory } from '../composables/useInventory'

const emit = defineEmits(['drag', 'hover', 'hoverLeave', 'change'])

type ContainerSlotsProps = {
  path: number[]
}

const props = defineProps<ContainerSlotsProps>()

const { deposit, exchange, findCell, hand, pickup } = useInventory()

const isHovering = ref(false)
const setIsHovering = (value: boolean) => {
  isHovering.value = value
}
const onLeftClick = () => {
  const cell = findCell(props.path)
  const hasEmptyHand = !hand.value?.item

  if (hasEmptyHand) {
    pickup(props.path, cell.item.amount)
  } else if (!cell.item || hand.value.item.id === cell.item.id) {
    deposit(props.path)
    emit('change', props.path)
  } else {
    exchange(props.path)
    emit('change', props.path)
  }
}

const onRightClick = (event) => {
  event.preventDefault()

  const cell = findCell(props.path)

  if (!hand.value?.item || hand.value.item.id === cell.item?.id) {
    pickup(props.path, 1)
  }
}

const onDrag = (event) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  emit('drag', props.path)
}
</script>