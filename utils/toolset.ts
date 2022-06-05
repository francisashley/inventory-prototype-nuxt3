import containerTools from '@/utils/containerTools'
import itemCatalogueTools from '@/utils/itemCatalogueTools'

export default {
  createContainer: containerTools.createContainer,
  createItem: itemCatalogueTools.createItem,
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
      findItemById: (id) => itemCatalogueTools.findItemById(items, id),
    }
  },
}
