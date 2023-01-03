<template>
  <div>
    <slot />
    <HeldItem :item="hand.state && !hand.state.isDragging ? hand.state.item : null" />
    <SlotTooltip v-if="!hand" :item="hoveredSlot ? hoveredSlot.item : null" />
  </div>
</template>

<script lang="ts" setup>
import { useState } from '../composables/useState'
import { useHand } from '../composables/useHand'
import { ValueItem, ID } from '../interfaces/inventory'

const emit = defineEmits(['change'])

type ContainerProps = {
  id: ID
  value: ValueItem[]
}

const props = withDefaults(defineProps<ContainerProps>(), {
  name: null,
  value: () => [],
})

const { getContainer, hoveredSlot, registerContainer, setContainerItems } = useState()
const hand = useHand()

// initialise container
registerContainer(props.id)
setContainerItems(props.id, props.value)
const container = getContainer(props.id)

// update container when props change
watch(props, () => setContainerItems(props.id, props.value))

// update container when props change
watch(container, () => {
  const items = Array.from(container.value.slots.values()).filter((slot) => slot.item)
  emit('change', { ...container.value, items })
})
</script>
