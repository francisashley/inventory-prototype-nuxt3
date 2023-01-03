<template>
  <div v-for="(container, i) in demoContainers" :key="i" class="tw-mx-auto tw-mt-8">
    <Button text="Add random item" @click="addRandomItem(container.id)" />
    <Container
      :id="container.id"
      :class="[
        'tw-relative tw-p-2 tw-border tw-border-thin tw-overflow-scroll tw-flex tw-flex-wrap tw-mx-auto tw-min-h-45 tw-w-min',
        { 'tw-border-blue-400': container.color === 'blue', 'tw-border-red-400': container.color === 'red' },
      ]"
      :value="container.items"
      @change="onChange"
    >
      <div v-for="(slotRow, j) in getRows(container.slots)" :key="j" class="tw-w-full tw-flex">
        <ContainerSlot v-for="(slot, k) in slotRow" :id="slot.path[1]" :key="k" :container-id="slot.path[0]">
          <template #default="{ item }">
            <Item v-if="item" :item="item" />
          </template>
        </ContainerSlot>
      </div>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import chunk from 'lodash-es/chunk'
import Button from './components/Button.vue'
import { useDemo } from '@/composables/useDemo'
import { permContainer } from '@/utils/dev.utils'

const { demoContainers, setDemoContainers, addRandomItem } = useDemo()

const getRows = (slots) => {
  return chunk(slots, 8)
}

const onChange = (updatedContainer) => {
  updatedContainer = permContainer(updatedContainer)
  const updatedDemoContainers = demoContainers.value.map((container) => {
    return container.id === updatedContainer.id ? { ...container, ...updatedContainer } : container
  })
  setDemoContainers(updatedDemoContainers)
}
</script>
