<template>
  <div>
    <slot />
    <HeldItem :item="hand.state.value && !hand.state.value.isDragging ? hand.state.value.item : null" />
    <SlotTooltip v-if="!hand" :item="hoveredSlot ? hoveredSlot.item : null" />
  </div>
</template>

<script lang="ts" setup>
import { useInventory } from '../composables/useInventory'
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

const { saveContainer, getComputedContainer, hand, hoveredSlot } = useInventory()

// initialise container
saveContainer(props.id, { id: props.id, slots: props.value })
const container = getComputedContainer(props.id)

// update container when props change
watch(props, () => saveContainer(props.id, { id: props.id, slots: props.value }))

// update container when props change
watch(container, () => emit('change', container.value))
</script>
