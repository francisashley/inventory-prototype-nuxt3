<template>
  <div v-for="(container, i) in demoContainers" :key="i" class="tw-mx-auto tw-mt-8">
    <AddItemButton @click="addRandomItem(container.id)" />
    <GridContainer
      :id="container.id"
      :color="container.color"
      :size="container.size"
      :value="container.slots"
      class="tw-min-h-45 tw-w-min"
      @change="onChange"
    >
      <div v-for="(slotRow, j) in getRows(container.slots)" :key="j" class="tw-w-full tw-flex">
        <ContainerSlot v-for="(slot, k) in slotRow" :key="k" :path="slot.path">
          <template #default="{ item }">
            <Item v-if="item" :item="item" />
          </template>
        </ContainerSlot>
      </div>
    </GridContainer>
  </div>
</template>

<script lang="ts" setup>
import chunk from 'lodash/chunk'
import AddItemButton from './components/AddItemButton.vue'
import GridContainer from './components/GridContainer.vue'
import { useDemo } from '@/composables/useDemo'
const { demoContainers, setDemoContainers, addRandomItem } = useDemo()

const getRows = (slots) => {
  return chunk(slots, 8)
}

const onChange = (updatedContainer) => {
  const updatedDemoContainers = demoContainers.value.map((container) => {
    return container.id === updatedContainer.id ? updatedContainer : container
  })
  setDemoContainers(updatedDemoContainers)
}
</script>
