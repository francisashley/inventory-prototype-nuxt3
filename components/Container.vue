<template>
  <div>
    <slot />
    <HeldItem :item="hand && !hand.isDragging ? hand.item : null" />
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
saveContainer(props.id, { ...props, slots: props.value })
const container = getComputedContainer(props.id)

// update container when props change
watch(props, () => saveContainer(props.id, { ...props, slots: props.value }))

// update container when props change
watch(container, () => emit('change', container))
</script>
