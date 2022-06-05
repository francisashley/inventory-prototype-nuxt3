<template>
  <div class="min-h-screen flex flex-col flex-1 bg-gray-900">
    <div v-for="(container, i) in getEnrichedContainers" :key="i" class="mx-auto mt-8">
      <Container
        :id="container.id"
        :items="container.items"
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
import { initialItems, initialContainers } from '@/utils/initialData'

const items = ref(initialItems)
const containers = ref(initialContainers)

const getEnrichedContainers = computed(() => {
  return [...containers.value].map((container) => {
    return {
      ...container,
      items: [...container.items].map((item) =>
        item
          ? {
              ...item,
              ...toolset.items(items.value).findItemById(item.id),
            }
          : null
      ),
    }
  })
})

const onMove = (event) => {
  const fromContainerIndex = toolset.containers(containers.value).findIndexOfId(event.from.containerId)
  const toContainerIndex = toolset.containers(containers.value).findIndexOfId(event.to.containerId)

  const itemAtTarget = toolset.container(containers.value[toContainerIndex]).findItemAtIndex(event.to.cellId)
  const isSwitching = (itemAtTarget?.id && itemAtTarget.id !== event.item.id) || false

  containers.value = [...containers.value].map((container, i) => {
    if (i === toContainerIndex) {
      container = toolset.container(container).addItemAtIndex(event.to.cellId, event.item)
    }

    if (i === fromContainerIndex) {
      container = toolset.container(container).clearIndex(event.from.cellId)

      if (isSwitching) {
        container = toolset.container(container).addItemAtIndex(event.from.cellId, itemAtTarget)
      }
    }

    return container
  })
}
</script>
