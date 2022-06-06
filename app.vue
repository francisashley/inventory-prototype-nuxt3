<template>
  <div class="min-h-screen flex flex-col flex-1 bg-gray-900">
    <div v-for="(container, i) in containers" :key="i" class="mx-auto mt-8">
      <button class="rounded bg-blue-600 mb-2 text-xs text-white py-1 px-2" @click="onAddRandomItem(container.id)">
        Add random item
      </button>
      <Container
        :id="container.id"
        :cells="container.cells"
        :theme="container.theme"
        :rows="container.rows"
        :cols="container.cols"
        @move="onMove"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import itemFixtures from '@/assets/fixtures/item-catalogue.json'
import containerFixtures from '@/assets/fixtures/containers.json'

import ct from '@/utils/containerTools'
import it from '@/utils/itemTools'

// Generate initial data
const items = it(itemFixtures as Item[]).get()
let initialContainers = ct(containerFixtures as Container[]).get()
for (let i = 0; i < 12; i++) {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  initialContainers = ct(initialContainers).depositFirstAvailableCell([initialContainers[0].id], item, randomAmount)
}

// State
const containers = ref(initialContainers)

// Handle moving items between cells
const onMove = ({ from: fromPath, to: toPath }) => {
  const fromCell = ct(containers.value).findCell(fromPath)
  const toCell = ct(containers.value).findCell(toPath)

  const shouldSwitch = toCell.item && toCell.item.id !== fromCell.item.id

  if (shouldSwitch) {
    containers.value = ct(containers.value).switchItems(fromPath, toPath)
  } else {
    containers.value = ct(containers.value).moveItem(fromPath, toPath)
  }
}

const onAddRandomItem = (containerId: number) => {
  const randomAmount = Math.floor(Math.random() * 10) + 1
  const randomItemIndex = Math.floor(Math.random() * items.length)
  const item = items[randomItemIndex]
  containers.value = ct(containers.value).depositFirstAvailableCell([containerId], item, randomAmount)
}
</script>
