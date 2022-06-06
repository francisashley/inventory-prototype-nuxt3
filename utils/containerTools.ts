/// /////////////////////////////////////////////////////////////////////////////
// PRIVATE TOOLS                                                              ///
/// /////////////////////////////////////////////////////////////////////////////

const _randomNumber = () => Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
const _generateEmptyArray = (length: number) => Array(length).fill(null)

/**
 * Returns the index of the last element in the array where predicate is true, and -1
 * otherwise.
 * @param array The source array to search in
 * @param predicate find calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found,
 * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
 */
function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length
  while (l--) {
    if (predicate(array[l], l, array)) return l
  }
  return -1
}

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
  const size = 'size' in container ? container.size : ([8, 2] as ContainerSize)

  const calculateTotalCells = (containerSize: ContainerSize, currentCells: Cell[]) => {
    const containerCols = containerSize[0]
    const containerRows = containerSize[1]

    const lastFilledIndex = findLastIndex(currentCells, (cell) => cell.item !== null)
    const lastFilledRow = lastFilledIndex === -1 ? 0 : Math.floor(lastFilledIndex / containerSize[0])

    const currentNeededCells = (lastFilledRow + 1) * containerCols

    const minimumCells = containerCols * containerRows

    if (currentNeededCells < minimumCells) {
      return minimumCells
    }

    const currentFilledCellsAmount = currentCells.filter((cell) => cell.item !== null).length

    if (currentFilledCellsAmount >= currentNeededCells - 1) {
      return currentNeededCells + containerCols
    }

    return currentNeededCells
  }

  const currentCells = container.cells || []
  const totalCells = calculateTotalCells(size, currentCells)

  const cells = _generateEmptyArray(totalCells).map((_, cellId) => ({
    id: cellId,
    path: [id, cellId],
    item: container?.cells?.[cellId]?.item || null,
    amount: container?.cells?.[cellId]?.amount || 0,
  }))

  return { id, name, theme, cells, size }
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
const multiContainerFindCell = (containers: Container[], path: Path) => {
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
const multiContainerClearCell = (containers: Container[], path: Path) => {
  return multiContainerReplace(containers, path[0], (container) => clearCell(container, path[1]))
}

/**
 * Deposit item in cell in containers
 */
const multiContainerDepositCell = (containers: Container[], path: Path, item: Item, amount: number) => {
  return multiContainerReplace(containers, path[0], (container) => depositCell(container, path[1], item, amount))
}

/**
 *  Deposit the item in the first available cell
 */
const depositFirstAvailableCell = (
  containers: Container[],
  path: Path,
  item: Item,
  amount: number = 1
): Container[] => {
  return multiContainerReplace(containers, path[0], (container) => {
    const cells = [...container.cells]

    const cell = cells.find((cell) => cell.item === null)

    if (cell) {
      cells[cell.id] = { ...cells[cell.id], item, amount }
    }

    return parseContainer({ ...container, cells })
  })
}

/**
 * Switch items between two cells
 */
const switchItems = (containers: Container[], pathA: Path, pathB: Path) => {
  const pathACell = multiContainerFindCell(containers, pathA)
  const pathBCell = multiContainerFindCell(containers, pathB)

  containers = multiContainerClearCell(containers, pathA)
  containers = multiContainerClearCell(containers, pathB)

  containers = multiContainerDepositCell(containers, pathA, pathBCell.item, pathACell.amount)
  containers = multiContainerDepositCell(containers, pathB, pathACell.item, pathBCell.amount)

  return [...containers].map(parseContainer)
}

/**
 * Move item from one cell to another
 */
const moveItem = (containers: Container[], fromPath: Path, toPath: Path) => {
  const fromCell = multiContainerFindCell(containers, fromPath)

  containers = multiContainerClearCell(containers, fromPath)
  containers = multiContainerDepositCell(containers, toPath, fromCell.item, fromCell.amount)

  return [...containers].map(parseContainer)
}

export default function (containers: Container[]) {
  containers = [...containers].map(parseContainer)

  return {
    get: (): Container[] => containers,
    findCell: (path: Path) => multiContainerFindCell(containers, path),
    clearCell: (path: Path) => multiContainerClearCell(containers, path),
    depositCell: (path: Path, item: Item, amount: number) => multiContainerDepositCell(containers, path, item, amount),
    switchItems: (pathA: Path, pathB: Path) => switchItems(containers, pathA, pathB),
    moveItem: (fromPath: Path, toPath: Path) => moveItem(containers, fromPath, toPath),
    depositFirstAvailableCell: (path: Path, item: Item, amount: number) =>
      depositFirstAvailableCell(containers, path, item, amount),
  }
}
