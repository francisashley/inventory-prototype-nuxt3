<template>
  <div class="min-h-screen flex flex-col flex-1 bg-gray-900">
    <div v-for="(container, i) in containers" :key="i" class="mx-auto mt-8">
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
import toolset from '@/utils/toolset'
import initialContainers from '@/utils/initialData'

const containers = ref(initialContainers)

const onMove = (event) => {
  const fromCell = toolset.containers(containers.value).findCell(event.from)
  const toCell = toolset.containers(containers.value).findCell(event.to)

  const shouldSwitch = toCell.item && toCell.item.id !== fromCell.item.id

  if (shouldSwitch) {
    containers.value = toolset.containers(containers.value).switchItems(event.from, event.to)
  } else {
    containers.value = toolset.containers(containers.value).moveItem(event.from, event.to)
  }
}
</script>
