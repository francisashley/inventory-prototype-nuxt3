interface item {
  id: number
  name: string
  tags: string[]
  image: string | null
  createdAt: string
  updatedAt: string
}

interface containerItem extends item {
  amount: number
}

type theme = 'white' | 'red' | 'blue'

interface container {
  id: number
  name: string
  theme: theme
  items: (containerItem | null)[]
  rows: number
  cols: number
  createdAt: string
  updatedAt: string
}

interface looseContainer {
  name?: string
  theme?: 'white' | 'red' | 'blue'
  items?: (containerItem | null)[]
  rows?: number
  cols?: number
}
