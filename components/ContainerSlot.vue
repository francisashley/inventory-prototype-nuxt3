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
          <slot :path="slot.path" :item="slot.item ?? null" />
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
import { useState } from '../composables/useState'
import { useInventory } from '../composables/useInventory'
import { useHand } from '../composables/useHand'

const emit = defineEmits(['drag', 'hover', 'hoverLeave', 'change'])

type ContainerSlotsProps = {
  path: number[]
}

const props = defineProps<ContainerSlotsProps>()

const { saveSlot, move } = useInventory()
const { setHoveredSlot, getSlot } = useState()
const hand = useHand()

saveSlot(props.path[0], props.path[1], { id: props.path[1], path: props.path, item: null })
const slot = getSlot(props.path)

const isHovering = ref(false)
const setIsHovering = (value: boolean) => (isHovering.value = value)

const onLeftClick = () => {
  const slot = getSlot(props.path).value
  const hasEmptyHand = !hand.state?.item

  if (hasEmptyHand) {
    hand.pickup(props.path, slot.item.amount)
  } else if (!slot.item || hand.state.item.id === slot.item.id) {
    hand.deposit(props.path)
    emit('change', props.path)
  } else {
    hand.exchange(props.path)
    emit('change', props.path)
  }
}

const onRightClick = (event) => {
  const slot = getSlot(props.path).value

  if (!slot.item) return

  event.preventDefault()

  if (!hand.state?.item || hand.state.item.id === slot.item?.id) {
    hand.pickup(props.path, 1)
  }
}

const onDrag = (event) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  hand.pickup(slot.value.path, slot.value.item.amount, true)
}

const onDrop = () => {
  const from = hand.state.from

  const fromSlot = getSlot(from).value
  const toSlot = getSlot(props.path).value

  if (
    typeof fromSlot.item !== 'undefined' &&
    typeof toSlot.item !== 'undefined' &&
    fromSlot.item?.id === toSlot.item?.id
  ) {
    move(from, props.path)
  } else {
    hand.swap(from, props.path)
  }

  hand.clear()
  emit('change', props.path)
}
</script>
