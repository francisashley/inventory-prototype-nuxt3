import { reactive } from 'vue'
import { Path, Item } from '../interfaces/inventory'
import { useState } from './useState'
import tool from '@/utils/tool.utils'

type HandState = {
  from: Path | null
  item: Item | null
  isDragging: boolean
}

const state = reactive<HandState>({
  from: null,
  item: null,
  isDragging: false,
})

export function useHand() {
  const { containers, setContainers, getSlot } = useState()

  const pickup = (from: Path, amount: number, isDragging = false) => {
    state.from = from
    state.item = { ...getSlot(from).value.item, amount: state.item ? state.item.amount + amount : amount }
    state.isDragging = isDragging

    if (!isDragging) {
      setContainers(tool.containers(containers.value).pickUpSlot(from[0], from[1], amount)[1])
    }
  }

  const exchange = (to: Path) => {
    const toSlot = tool.containers(containers.value).findSlot(to[0], to[1])
    const heldItem = state.item
    state.item = toSlot.item
    setContainers(tool.containers(containers.value).depositSlot(to[0], to[1], heldItem))
  }

  const deposit = (to: Path, amount?: number) => {
    const heldItem = state.item
    amount = amount ?? heldItem.amount
    const leftInHand = heldItem.amount - amount
    state.item = leftInHand > 0 ? { ...state.item, amount: leftInHand } : null
    setContainers(tool.containers(containers.value).depositSlot(to[0], to[1], heldItem))
  }

  const swap = (from: Path, to: Path) => {
    const fromItem = tool.containers(containers.value).findSlot(from[0], from[1]).item
    const toItem = tool.containers(containers.value).findSlot(to[0], to[1]).item

    state.item = toItem

    let updatedContainers = tool.containers(containers.value).clearSlot(to[0], to[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(to[0], to[1], fromItem)

    updatedContainers = tool.containers(updatedContainers).clearSlot(from[0], from[1])
    updatedContainers = tool.containers(updatedContainers).depositSlot(from[0], from[1], toItem)

    setContainers(updatedContainers)
  }

  const clear = () => {
    state.from = null
    state.item = null
    state.isDragging = false
  }

  return {
    state,
    pickup,
    // release,
    exchange,
    deposit,
    swap,
    clear,
  }
}
