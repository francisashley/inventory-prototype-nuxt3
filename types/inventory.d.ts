interface item {
  id: number
  name: string
  tags: string[]
  image: string | null
  createdAt: string
  updatedAt: string
}

interface containerItem {
  id: number
  amount: number
}

interface container {
  id: number
  name: string
  theme: 'white' | 'red' | 'blue'
  items: (containerItem | null)[]
  rows: number
  cols: number
  createdAt: string
  updatedAt: string
}
