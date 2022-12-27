export interface Input {
  cell: number
  item: Item
}

export interface Container {
  id: number
  cells: ContainerSlot[]
}

export interface Item {
  id: number
  name: string
  image?: string
  amount: number
}

export interface ContainerSlot {
  id: number
  path: Path
  item: Item | null
}

export type Path = number[]

export type ContainerSize = [number, number]
