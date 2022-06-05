interface item {
  id: number
  name: string
  tags: string[]
  image: string | null
}

interface containerItem extends item {
  amount: number
}

type containerTheme = 'white' | 'red' | 'blue'

interface container {
  id: number
  name: string
  theme: containerTheme
  items: (containerItem | null)[]
  rows: number
  cols: number
}

interface looseContainer {
  name?: string
  theme?: containerTheme
  items?: (containerItem | null)[]
  rows?: number
  cols?: number
}
