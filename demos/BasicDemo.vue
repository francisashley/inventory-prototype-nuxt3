<template>
  <div v-for="(container, i) in containers" :key="i" class="tw-mx-auto tw-mt-8">
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
import { ref } from 'vue'
import AddItemButton from './components/AddItemButton.vue'

import itemFixtures from '@/assets/fixtures/item-catalogue.json'
import containerFixtures from '@/assets/fixtures/containers.json'

import { depositFirstAvailableSlot } from '@/utils/container.utils'
import { createItem } from '@/utils/item.utils'
import { getRandomItem, generateSlots } from '@/utils/demo.utils'
import { generateId } from '@/utils/id.utils'

const items = itemFixtures.map(createItem)
const initialContainers = [...containerFixtures].map((containerFixture) => {
  const size = [8, 2]
  const id = generateId()
  const slots = generateSlots(id, size, [])

  return { id, name: containerFixture.name, color: containerFixture.color, slots, size }
})

for (let i = 0; i < 12; i++) {
  const item = getRandomItem(items)
  initialContainers[0].slots = depositFirstAvailableSlot(initialContainers[0].slots, item)
}

const containers = ref(initialContainers)

const findContainer = (id) => {
  return containers.value.find((container) => container.id === id)
}

const replaceContainer = (id, container) => {
  containers.value = containers.value.map((c) => (c.id === id ? container : c))
}

const onChange = (updatedContainer) => {
  replaceContainer(updatedContainer.id, updatedContainer)
}

const onAddRandomItem = (containerId: number) => {
  const item = getRandomItem(items)
  const container = findContainer(containerId)
  container.slots = depositFirstAvailableSlot(container.slots, item)
  replaceContainer(containerId, container)
}
</script>
