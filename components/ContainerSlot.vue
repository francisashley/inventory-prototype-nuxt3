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

import { useHand } from '../composables/useHand'
import { ID } from '../interfaces/inventory'

const emit = defineEmits(['drag', 'hover', 'hoverLeave', 'change'])

type ContainerSlotsProps = {
  containerId: ID
  id: ID
}

const props = defineProps<ContainerSlotsProps>()

const { setHoveredSlot, getSlot, setSlot } = useState()
const hand = useHand()

// setSlot(props.containerId, props.id, { id: props.id, path: [props.containerId, props.id], item: null })
const slot = getSlot(props.containerId, props.id)

const isHovering = ref(false)
const setIsHovering = (value: boolean) => (isHovering.value = value)

const onLeftClick = () => {
  const slot = getSlot(props.containerId, props.id).value
  const hasEmptyHand = !hand.state?.item

  if (hasEmptyHand) {
    hand.pickup(props.containerId, props.id, slot.item.amount)
  } else if (!slot.item || hand.state.item.id === slot.item.id) {
    hand.deposit(props.containerId, props.id)
    emit('change', [props.containerId, props.id])
  } else {
    hand.exchange([props.containerId, props.id])
    emit('change', [props.containerId, props.id])
  }
}

const onRightClick = (event) => {
  const slot = getSlot(props.containerId, props.id).value

  if (!slot.item) return

  event.preventDefault()

  if (!hand.state?.item || hand.state.item.id === slot.item?.id) {
    hand.pickup(props.containerId, props.id, 1)
  }
}

const onDrag = (event) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  hand.pickup(slot.value.path[0], slot.value.path[1], slot.value.item.amount, true)
}

const onDrop = () => {
  const fromContainerId = hand.state.fromContainerId
  const fromSlotId = hand.state.fromSlotId

  const fromSlot = getSlot(fromContainerId, fromSlotId).value
  const toSlot = getSlot(props.containerId, props.id).value

  const isHoveringSameSlot = fromContainerId === props.containerId && fromSlotId === props.id
  const isHoveringEmptySlot = !toSlot.item

  if (isHoveringSameSlot) {
    hand.clear()
  } else if (fromSlot.item?.id === toSlot.item?.id || isHoveringEmptySlot) {
    hand.deposit(props.containerId, props.id)
  } else {
    hand.swap([fromContainerId, fromSlotId], [props.containerId, props.id])
  }

  emit('change', [props.containerId, props.id])
}
</script>
