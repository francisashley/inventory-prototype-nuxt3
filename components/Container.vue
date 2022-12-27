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

const { createContainer, updateContainer, hand, hoveredSlot } = useInventory()

// initialise container
const { container } = createContainer({ ...props, cells: props.value })

// update container when props change
watch(props, () => updateContainer(props.id, { ...props, cells: props.value }))

// update container when props change
watch(container, () => emit('change', container))
</script>
