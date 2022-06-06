// PRIVATE TOOLS

const _randomNumber = () => Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
const _generateEmptyArray = (length: number) => Array(length).fill(null)

// CONTAINER TOOLS

/**
 * Return properly formatted container
 */
export const parseContainer = (container: Container): Container => {
  const id = 'id' in container ? container.id : _randomNumber()
  const name = 'name' in container ? container.name : ''
  const theme = 'theme' in container ? container.theme : 'white'
  const rows = 'rows' in container ? container.rows : 2
  const cols = 'cols' in container ? container.cols : 8

  const cells = _generateEmptyArray(rows * cols).map((_, cellId) => ({
    id: cellId,
    path: [id, cellId],
    item: container?.cells?.[cellId]?.item || null,
    amount: container?.cells?.[cellId]?.amount || 0,
  }))

  return { id, name, theme, cells, rows, cols }
}

/**
 * Find item in cell
 */
export const findCell = (container: Container, cellId: number) => {
  return container.cells[cellId]
}

/**
 *  Deposit the item in the first available cell
 */
export const depositFirstAvailableCell = (container: Container, item: Item, amount: number = 1): Container => {
  const cells = [...container.cells]

  const cell = cells.find((cell) => cell.item === null)

  if (cell) {
    cells[cell.id] = { ...cells[cell.id], item, amount }
  }

  return { ...container, cells }
}

/**
 * Clear contents of a cell
 */
export const clearCell = (container: Container, cellId: number) => {
  return {
    ...container,
    cells: [...container.cells].map((cell, index) => {
      if (index === cellId) {
        return { ...cell, item: null }
      } else {
        return cell
      }
    }),
  }
}

/**
 * Deposit item in cell
 */
export const depositCell = (container: Container, cellId: number, item: Item, amount: number) => {
  return {
    ...container,
    cells: [...container.cells].map((cell) => {
      if (cell.id === cellId) {
        amount = cell.item?.id === item.id ? cell.amount + amount : amount
        return { ...cell, item, amount }
      } else {
        return cell
      }
    }),
  }
}

export default function (container: Container) {
  container = parseContainer(container)

  return {
    get: () => container,
    findCell: (cellId) => findCell(container, cellId),
    clearCell: (item) => clearCell(container, item),
    depositCell: (cellId, item, amount) => depositCell(container, cellId, item, amount),
    depositFirstAvailableCell: (item, amount) => depositFirstAvailableCell(container, item, amount),
  }
}
