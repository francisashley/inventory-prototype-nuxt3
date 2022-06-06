/// /////////////////////////////////////////////////////////////////////////////
// PRIVATE TOOLS                                                              ///
/// /////////////////////////////////////////////////////////////////////////////

const _randomNumber = () => Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
const _generateEmptyArray = (length: number) => Array(length).fill(null)

/// /////////////////////////////////////////////////////////////////////////////
// CONTAINER TOOLS                                                            ///
/// /////////////////////////////////////////////////////////////////////////////

/**
 * Return formatted container
 */
const parseContainer = (container: Container): Container => {
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
const findCell = (container: Container, cellId: number) => {
  return container.cells[cellId]
}

/**
 * Clear contents of a cell
 */
const clearCell = (container: Container, cellId: number) => {
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
const depositCell = (container: Container, cellId: number, item: Item, amount: number) => {
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

/// /////////////////////////////////////////////////////////////////////////////
// MULTI CONTAINER TOOLS                                                      ///
/// /////////////////////////////////////////////////////////////////////////////

/**
 * Find container in containers
 */
const multiContainerFind = (containers: Container[], containerId: number) => {
  return containers.find((container) => container.id === containerId)
}

/**
 * Find item in cell in containers
 */
const multiContainerFindCell = (containers: Container[], path: CellPath) => {
  return findCell(multiContainerFind(containers, path[0]), path[1])
}

/**
 * Replace container in containers
 */
const multiContainerReplace = (
  containers: Container[],
  containerId: number,
  fn: (container: Container) => Container
) => {
  return [...containers].map((container) => {
    return container.id === containerId ? fn(container) : container
  })
}

/**
 * Clear contents of a cell in containers
 */
const multiContainerClearCell = (containers: Container[], path: CellPath) => {
  return multiContainerReplace(containers, path[0], (container) => clearCell(container, path[1]))
}

/**
 * Deposit item in cell in containers
 */
const multiContainerDepositCell = (containers: Container[], path: CellPath, item: Item, amount: number) => {
  return multiContainerReplace(containers, path[0], (container) => depositCell(container, path[1], item, amount))
}

/**
 *  Deposit the item in the first available cell
 */
const depositFirstAvailableCell = (
  containers: Container[],
  path: CellPath,
  item: Item,
  amount: number = 1
): Container[] => {
  return multiContainerReplace(containers, path[0], (container) => {
    const cells = [...container.cells]

    const cell = cells.find((cell) => cell.item === null)

    if (cell) {
      cells[cell.id] = { ...cells[cell.id], item, amount }
    }

    return { ...container, cells }
  })
}

/**
 * Switch items between two cells
 */
const switchItems = (containers: Container[], pathA: CellPath, pathB: CellPath) => {
  const pathACell = multiContainerFindCell(containers, pathA)
  const pathBCell = multiContainerFindCell(containers, pathB)

  containers = multiContainerClearCell(containers, pathA)
  containers = multiContainerClearCell(containers, pathB)

  containers = multiContainerDepositCell(containers, pathA, pathBCell.item, pathACell.amount)
  containers = multiContainerDepositCell(containers, pathB, pathACell.item, pathBCell.amount)

  return containers
}

/**
 * Move item from one cell to another
 */
const moveItem = (containers: Container[], fromPath: CellPath, toPath: CellPath) => {
  const fromCell = multiContainerFindCell(containers, fromPath)

  containers = multiContainerClearCell(containers, fromPath)
  containers = multiContainerDepositCell(containers, toPath, fromCell.item, fromCell.amount)

  return containers
}

export default function (containers: Container[]) {
  containers = [...containers].map(parseContainer)

  return {
    get: (): Container[] => containers,
    findCell: (path: CellPath) => multiContainerFindCell(containers, path),
    clearCell: (path: CellPath) => multiContainerClearCell(containers, path),
    depositCell: (path: CellPath, item: Item, amount: number) =>
      multiContainerDepositCell(containers, path, item, amount),
    switchItems: (pathA: CellPath, pathB: CellPath) => switchItems(containers, pathA, pathB),
    moveItem: (fromPath: CellPath, toPath: CellPath) => moveItem(containers, fromPath, toPath),
    depositFirstAvailableCell: (path: CellPath, item: Item, amount: number) =>
      depositFirstAvailableCell(containers, path, item, amount),
  }
}
