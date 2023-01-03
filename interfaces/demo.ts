import { ContainerSlot, ValueItem, ID } from '@/interfaces/inventory'

export type DemoContainer = {
  id: ID
  color: 'blue' | 'red'
  slots: ContainerSlot[]
  items: ValueItem[]
}
