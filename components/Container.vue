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
import { ContainerSlot, ID } from '../interfaces/inventory'

const emit = defineEmits(['change'])

type ContainerProps = {
  id: ID
  value: ContainerSlot[]
}

const props = withDefaults(defineProps<ContainerProps>(), {
  name: null,
  value: () => [],
})

const { getContainer, hoveredSlot, setContainer } = useState()
const hand = useHand()

const convertSlotsToMap = (slots: ContainerSlot[]) => {
  return slots.reduce((acc,slot) => {
    return acc.set(slot.id,slot)
  }, new Map<ID, ContainerSlot>)
}

// initialise container
setContainer(props.id, { id: props.id, slots: convertSlotsToMap(props.value) })
const container = getContainer(props.id)

// update container when props change
watch(props, () => setContainer(props.id, { id: props.id, slots: convertSlotsToMap(props.value) }))

// update container when props change
watch(container, () => {
  const slots = Array.from(container.value.slots.values())
  emit('change', {...container, slots})
})
</script>
