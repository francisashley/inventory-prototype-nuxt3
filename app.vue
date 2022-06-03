<template>
  <div class="min-h-screen flex flex-col flex-1 bg-gray-900">
    <Container
      v-for="(container, i) in containers"
      :key="i"
      class="container mx-auto mt-8"
      :items="container.items"
      :theme="container.theme"
    />
  </div>
</template>

<script lang="ts" setup>
const containers = ref([
  {
    name: 'Container A',
    theme: 'blue',
    items: [
      {
        name: 'Ultimate Direction Fastpack 25',
        tags: ['Backpack', 'Summer'],
        image: '/static/items/ultimate-direction-fastpack-25.jpg',
        amount: 0,
      },
      {
        name: 'Sea to summit Silk Liner',
        tags: ['Sleeping bag liner'],
        image: '/static/items/sea-to-summit-silk-liner.jpg',
        amount: 4,
      },
      {
        name: 'Swiss army knife',
        tags: ['Knife'],
        image: '/static/items/swiss-army-knife.jpg',
        amount: 0,
      },
      {
        name: 'Starbucks Via Italian Satchel',
        tags: ['coffee'],
        image: '/static/items/starbucks-via-italian-satchel.jpg',
        amount: 0,
      },
      {
        name: 'Oral B Pro dental floss',
        tags: ['dental-floss'],
        image: '/static/items/oral-b-dental-floss.jpg',
        amount: 0,
      },
      {
        name: 'Microfibre towel',
        tags: ['towel'],
        image: '/static/items/microfibre-towel.jpg',
        amount: 1,
      },
      {
        name: 'Benadryl',
        tags: ['first-aid'],
        image: '/static/items/benadryl.jpg',
        amount: 0,
      },
      {
        name: 'Fenix 6 Sapphire watch',
        tags: ['watch'],
        image: '/static/items/fenix-6-watch.webp',
        amount: 0,
      },
      {
        name: 'Passport',
        tags: ['document'],
        image: '/static/items/passport.jpg',
        amount: 0,
      },
      {
        name: 'Ciele Cap',
        tags: ['hat'],
        image: '/static/items/ciele-cap-navy.jpg',
        amount: 0,
      },
    ],
  },
  { name: 'Container B', theme: 'red', items: [] },
])
</script>
