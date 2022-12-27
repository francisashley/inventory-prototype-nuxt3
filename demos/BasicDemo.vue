<template>
  <div v-for="(container, i) in demoContainers" :key="i" class="tw-mx-auto tw-mt-8">
    <AddItemButton @click="onAddRandomItem(container.id)" />
    <Container
      :id="container.id"
      class="tw-relative tw-p-2 tw-border tw-border-thin tw-overflow-scroll tw-flex tw-flex-wrap tw-mx-auto"
      :class="{
        'tw-border-blue-400': container.color === 'blue',
        'tw-border-red-400': container.color === 'red',
      }"
      :style="{
        width: container.size[0] * 5 + 1.25 + 'rem',
        height: container.size[1] * 5 + 1.25 + 'rem',
      }"
      :value="container.slots"
      @change="onChange"
    >
      <ContainerSlot v-for="slot in container.slots" :key="slot.id" :path="slot.path" />
    </Container>
  </div>
</template>

<script lang="ts" setup>
import AddItemButton from './components/AddItemButton.vue'
import { useDemo } from '@/composables/useDemo'
import { depositFirstAvailableSlot } from '@/utils/container.utils'

const { demoContainers, setDemoContainers, generateRandomItem } = useDemo()

const onChange = (updatedContainer) => {
  const updatedDemoContainers = demoContainers.value.map((container) => {
    return container.id === updatedContainer.id ? updatedContainer : container
  })
  setDemoContainers(updatedDemoContainers)
}

const onAddRandomItem = (containerId: number) => {
  const updatedDemoContainers = demoContainers.value.map((demoContainer) => {
    if (demoContainer.id === containerId) {
      const item = generateRandomItem()
      return {
        ...demoContainer,
        slots: depositFirstAvailableSlot(demoContainer.slots, item),
      }
    }
    return demoContainer
  })
  setDemoContainers(updatedDemoContainers)
}
</script>
