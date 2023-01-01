<template>
  <div v-for="(container, i) in demoContainers" :key="i" class="tw-mx-auto tw-mt-8">
    <AddItemButton @click="addRandomItem(container.id)" />
    <Container
      :id="container.id"
      :class="[
        'tw-relative tw-p-2 tw-border tw-border-thin tw-overflow-scroll tw-flex tw-flex-wrap tw-mx-auto tw-min-h-45 tw-w-min',
        { 'tw-border-blue-400': container.color === 'blue', 'tw-border-red-400': container.color === 'red' },
      ]"
      :value="container.slots"
      @change="onChange"
    >
      <div v-for="(slotRow, j) in getRows(container.slots)" :key="j" class="tw-w-full tw-flex">
        <ContainerSlot v-for="(slot, k) in slotRow" :key="k" :path="slot.path">
          <template #default="{ item }">
            <Item v-if="item" :item="item" />
          </template>
        </ContainerSlot>
      </div>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import chunk from 'lodash/chunk'
import AddItemButton from './components/AddItemButton.vue'
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
