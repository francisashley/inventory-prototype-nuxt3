<template>
  <div v-for="(container, i) in demoContainers" :key="i" class="tw-mx-auto tw-mt-8">
    <AddItemButton @click="addRandomItem(container.id)" />
    <GridContainer
      :id="container.id"
      :color="container.color"
      :size="container.size"
      :value="container.slots"
      @change="onChange"
    >
      <ContainerSlot v-for="slot in container.slots" :key="slot.id" :path="slot.path" />
    </GridContainer>
  </div>
</template>

<script lang="ts" setup>
import AddItemButton from './components/AddItemButton.vue'
import GridContainer from './components/GridContainer.vue'
import { useDemo } from '@/composables/useDemo'

const { demoContainers, setDemoContainers, addRandomItem } = useDemo()

const onChange = (updatedContainer) => {
  const updatedDemoContainers = demoContainers.value.map((container) => {
    return container.id === updatedContainer.id ? updatedContainer : container
  })
  setDemoContainers(updatedDemoContainers)
}
</script>
