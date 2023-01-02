<template>
  <div>
    <slot />
    <HeldItem :item="hand.state && !hand.state.isDragging ? hand.state.item : null" />
    <SlotTooltip v-if="!hand" :item="hoveredSlot ? hoveredSlot.item : null" />
  </div>
</template>

<script lang="ts" setup>
import { useInventory } from '../composables/useInventory'
import { useState } from '../composables/useState'
import { useHand } from '../composables/useHand'
import { ContainerSlot } from '../interfaces/inventory'

const emit = defineEmits(['change'])

type ContainerProps = {
  id: number
  value: ContainerSlot[]
}

const props = withDefaults(defineProps<ContainerProps>(), {
  name: null,
  value: () => [],
})

const { getContainer, hoveredSlot } = useState()
const { saveContainer } = useInventory()
const hand = useHand()

// initialise container
saveContainer(props.id, { id: props.id, slots: props.value })
const container = getContainer(props.id)

// update container when props change
watch(props, () => saveContainer(props.id, { id: props.id, slots: props.value }))

// update container when props change
watch(container, () => emit('change', container.value))
</script>
