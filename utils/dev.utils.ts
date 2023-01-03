import { Container } from '../interfaces/inventory'

export const permContainer = (container: Container) => {
  return {
    ...container,
    slots: Array.from(container.slots.values()).map((slot) => JSON.parse(JSON.stringify(slot))),
    items: Array.from(container.items.values()).map((slot) => JSON.parse(JSON.stringify(slot))),
  }
}
