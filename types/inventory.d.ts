interface Item {
  id: number
  name: string
  image: string | null
}

type CellPath = number[]
interface Cell extends item {
  id: number
  path: CellPath
  item: Item | null
  amount: number
}

type ContainerSize = [number, number]
interface Container {
  id: number
  name: string
  theme: 'white' | 'red' | 'blue'
  cells: Cell[]
  size: ContainerSize
}
