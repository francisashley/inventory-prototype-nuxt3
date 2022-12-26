export interface Container {
  id: number
  name: string
  color: 'white' | 'red' | 'blue'
  cells: Cell[]
  size: ContainerSize
}

export interface Item {
  id: number
  name: string
  image: string | null
  amount: number
}

export interface Cell {
  id: number
  path: Path
  item: Item | null
}

export type Path = number[]

export type ContainerSize = [number, number]
