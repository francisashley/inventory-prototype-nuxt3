<div align="center">

# Inventory Prototype (built in Nuxt 3)

A dependency-free inventory system built in Vue (Nuxt) 3.

  <img src="public/img/demo.gif" alt="Inventory prototype example" title="Inventory prototype example" width="500" />
</div>

## IMPORTANT NOTE

This repo has diverged from drag-n-drop-prototype-nuxt3 in the direction of building a mechanic which can support fine tuning the amount of items that are picked up. It is not possible to fine tune the amount of items that are picked up with dragging and dropping. Thinking about updating to something similar to Stardew Valley / Terraria. Arma 3 is also an inspiration for how the items are designed in the containers (potentially spanning multiple slots). 

Just a thought.. possibly continue with drag and drop but holding shift while dragging only drags one

Another though..

- dragging drags the entire slot
- clicking collects the item in hand
- shift clicking picks up just one item
- holding shift while clicking, picks up multiple


THE FOLLOWING INFO IN THE README IS PROBABLY COMPLETELY WRONG AND NEEDS UPDATING.

## Installation

This is a prototype and cannot be installed. Copy this code into another project and modify.

## Usage

```html
<container :items="items" @move="onMove" />

<script>
  const items = initialItems

  const onMove = ({ itemId, from: {}, to: {} }) => {}
</script>
```

## API

### <container&gt;

#### Props

| name  | type                     | default   | description                                      |
| ----- | ------------------------ | --------- | ------------------------------------------------ |
| id    | `number`                 | required  | Used to identify which container the item is in. |
| items | `(item\|null)[]`         | []        | The items in the slots.                          |
| rows  | `number`                 | 2         | The amount of rows to show in the container.     |
| cols  | `number`                 | 2         | The amount of columns to show in the container.  |
| color | `"blue"\|"red"\|"white"` | `"white"` | The container border colour.                     |

#### Events

| name  | props       | description                                                              |
| ----- | ----------- | ------------------------------------------------------------------------ |
| @move | `MoveEvent` | This event fires after having dragged and dropped the item in a new slot |

## Types

```typescript
interface Container {
  id: number
  name: string
  color: 'white' | 'red' | 'blue'
  items: (containerItem | null)[]
  size: [number, number] // [cols, rows]
}
```

```typescript
interface Item {
  id: number
  name: string
  image: string | null
}
```

```typescript
interface MoveEvent {
  id: number
  name: string
  image: string | null
}
```

## Tools

```typescript
tools.container(container).create(): Container                                  // create a container
tools.container(container).findSlot(1): Slot                                    // find a slot in a container
tools.container(container).clearSlot(1): Container                              // clear a slot in a container
tools.container(container).depositSlot(1, item, amount)                         // deposit an item in a slot
tools.container(container).depositFirstAvailableSlot(item, amount): Container   // deposit an item in the first available slot
tools.containers(containers).findSlot(path): Container                          // find a slot in a container
tools.containers(containers).clearSlot(path): Container                         // clear a slot in a container
tools.containers(containers).depositSlot(path, item, amount): Container         // deposit an item in a slot
tools.containers(containers).switchSlots(pathA, pathB): Container               // switch two slots
tools.containers(containers).moveSlot(fromPath, toPath): Container              // move a slot
tools.catalogue.createItem(item): Item                                          // Create an item
tools.catalogue.findItemById(items, id): Item                                   // Find an item by id
```

## ToDo

- [ ] Can import component into another project
- [x] Can drag items between containers
- [ ] Can control the amount of an item dragged between containers
- [ ] Has clean API
- [ ] API is documented
