import containerTools from './containerTools'

const containersTool = (containers: Container[]) => {
  return {
    findCell: (path: CellPath) => {
      const container = containers.find((container) => container.id === path[0])
      return containerTools(container).findCell(path[1])
    },
    clearCell: (path: CellPath) => {
      return [...containers].map((container) => {
        if (container.id === path[0]) {
          return containerTools(container).clearCell(path[1])
        }
        return container
      })
    },
    depositCell: (path: CellPath, item: Item, amount: number) => {
      return [...containers].map((container) => {
        if (container.id === path[0]) {
          return containerTools(container).depositCell(path[1], item, amount)
        }
        return container
      })
    },
  }
}

/**
 * Switch items between two cells
 */
export const switchItems = (containers: Container[], pathA: CellPath, pathB: CellPath) => {
  const pathACell = containersTool(containers).findCell(pathA)
  const pathBCell = containersTool(containers).findCell(pathB)

  containers = containersTool(containers).clearCell(pathA)
  containers = containersTool(containers).clearCell(pathB)

  containers = containersTool(containers).depositCell(pathA, pathBCell.item, pathACell.amount)
  containers = containersTool(containers).depositCell(pathB, pathACell.item, pathBCell.amount)

  return containers
}

/**
 * Move item from one cell to another
 */
export const moveItem = (containers: Container[], fromPath: CellPath, toPath: CellPath) => {
  const fromCell = containersTool(containers).findCell(fromPath)

  containers = containersTool(containers).clearCell(fromPath)
  containers = containersTool(containers).depositCell(toPath, fromCell.item, fromCell.amount)

  return containers
}

export default function (containers: Container[]) {
  return {
    findCell: containersTool(containers).findCell,
    clearCell: containersTool(containers).clearCell,
    depositCell: containersTool(containers).depositCell,
    switchItems: (pathA, pathB) => switchItems(containers, pathA, pathB),
    moveItem: (fromPath, toPath) => moveItem(containers, fromPath, toPath),
  }
}
