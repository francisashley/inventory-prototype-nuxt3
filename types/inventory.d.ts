interface item {
  id: number
  name: string
  tags: string[]
  image: string | null
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
}

interface looseContainer {
  name?: string
  theme?: 'white' | 'red' | 'blue'
  items?: (containerItem | null)[]
  rows?: number
  cols?: number
}
