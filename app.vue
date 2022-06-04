<template>
  <div class="min-h-screen flex flex-col flex-1 bg-gray-900">
    <div v-for="({ id, items, theme }, i) in containers" :key="i" class="container mx-auto mt-8">
      <Container :id="id" :items="items" :theme="theme" @change="onChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const containers = ref([
  {
    id: 1,
    name: 'Container A',
    theme: 'blue',
    items: [
      {
        id: 'abc',
        name: 'Ultimate Direction Fastpack 25',
        tags: ['Backpack', 'Summer'],
        image: '/static/items/ultimate-direction-fastpack-25.jpg',
        amount: 0,
      },
      {
        id: 'def',
        name: 'Sea to summit Silk Liner',
        tags: ['Sleeping bag liner'],
        image: '/static/items/sea-to-summit-silk-liner.jpg',
        amount: 4,
      },
      {
        id: 'ghi',
        name: 'Swiss army knife',
        tags: ['Knife'],
        image: '/static/items/swiss-army-knife.jpg',
        amount: 0,
      },
      {
        id: 'jkl',
        name: 'Starbucks Via Italian Satchel',
        tags: ['coffee'],
        image: '/static/items/starbucks-via-italian-satchel.jpg',
        amount: 0,
      },
      {
        id: 'mno',
        name: 'Oral B Pro dental floss',
        tags: ['dental-floss'],
        image: '/static/items/oral-b-dental-floss.jpg',
        amount: 0,
      },
      {
        id: 'prw',
        name: 'Microfibre towel',
        tags: ['towel'],
        image: '/static/items/microfibre-towel.jpg',
        amount: 1,
      },
      {
        id: 'asd',
        name: 'Benadryl',
        tags: ['first-aid'],
        image: '/static/items/benadryl.jpg',
        amount: 0,
      },
      {
        id: 'hgf',
        name: 'Fenix 6 Sapphire watch',
        tags: ['watch'],
        image: '/static/items/fenix-6-watch.webp',
        amount: 0,
      },
      {
        id: 'fgd',
        name: 'Passport',
        tags: ['document'],
        image: '/static/items/passport.jpg',
        amount: 0,
      },
      {
        id: 'ppp',
        name: 'Ciele Cap',
        tags: ['hat'],
        image: '/static/items/ciele-cap-navy.jpg',
        amount: 0,
      },
    ],
  },
  { id: 2, name: 'Container B', theme: 'red', items: [] },
])

const onChange = ({ items, id }) => {
  containers.value = containers.value.map((container) => {
    return {
      ...container,
      items: container.id === id ? items : container.items,
    }
  })
}
</script>
