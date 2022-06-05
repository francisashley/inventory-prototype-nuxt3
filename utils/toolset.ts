import containerTools from '@/utils/containerTools'
import itemTools from '@/utils/itemTools'

export default {
  createContainer: containerTools.createContainer,
  createItem: itemTools.createItem,
  container: (container: container) => {
    return {
      appendItem: (item) => containerTools.appendItem(container, item),
      addItemAtIndex: (index, item) => containerTools.addItemAtIndex(container, index, item),
      clearIndex: (item) => containerTools.clearIndex(container, item),
      findItemAtIndex: (index) => containerTools.findItemAtIndex(container, index),
    }
  },
  containers: (containers: container[]) => {
    return {
      findIndexOfId: (id) => containerTools.findIndexOfId(containers, id),
    }
  },
  items: (items: item[]) => {
    return {
      findItemById: (id) => itemTools.findItemById(items, id),
    }
  },
}
