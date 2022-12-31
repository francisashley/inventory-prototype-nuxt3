<template>
  <div
    class="tw-p-1 tw-h-20 tw-w-20 tw-bg-gray-900"
    @mouseenter="setHoveredSlot(slot.item ? slot : null)"
    @mousedown="setHoveredSlot(null)"
    @mouseleave="setHoveredSlot(null)"
    @click="onLeftClick"
    @contextmenu="onRightClick"
    @drop="onDrop"
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
          <slot :path="slot.path" :item="slot.item ?? null">
            <Item v-if="slot.item" :item="slot.item" />
          </slot>
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

const { getComputedSlot, deposit, exchange, findSlot, hand, pickup, setHoveredSlot, move, clearHand, swap } =
  useInventory()

const slot = getComputedSlot(props.path)

const isHovering = ref(false)
const setIsHovering = (value: boolean) => (isHovering.value = value)

const onLeftClick = () => {
  const slot = findSlot(props.path)
  const hasEmptyHand = !hand.value?.item

  if (hasEmptyHand) {
    pickup(props.path, slot.item.amount)
  } else if (!slot.item || hand.value.item.id === slot.item.id) {
    deposit(props.path)
    emit('change', props.path)
  } else {
    exchange(props.path)
    emit('change', props.path)
  }
}

const onRightClick = (event) => {
  event.preventDefault()

  const slot = findSlot(props.path)

  if (!hand.value?.item || hand.value.item.id === slot.item?.id) {
    pickup(props.path, 1)
  }
}

const onDrag = (event) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  pickup(slot.value.path, slot.value.item.amount, true)
}

const onDrop = () => {
  const from = hand.value.from

  const fromSlot = findSlot(from)
  const toSlot = findSlot(props.path)

  if (
    typeof fromSlot.item !== 'undefined' &&
    typeof toSlot.item !== 'undefined' &&
    fromSlot.item?.id === toSlot.item?.id
  ) {
    move(from, props.path)
  } else {
    swap(from, props.path)
  }

  clearHand()
  emit('change', props.path)
}
</script>
