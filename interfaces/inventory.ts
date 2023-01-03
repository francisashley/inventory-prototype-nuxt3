export type ID = number | string
export type Path = ID[]

export interface ValueItem {
  path: Path
  item: Item
}

export interface Container {
  id: ID
  slots: Map<ID, ContainerSlot>
}

export interface Item {
  id: ID
  name: string
  image?: string
  amount: number
}

export interface ContainerSlot {
  id: ID
  path: Path
  item: Item | null
}
