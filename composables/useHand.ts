import { reactive, computed } from 'vue'

type hand = {
  from: number[]
  amount: number
}

const state = reactive<{ hand: hand | null }>({
  hand: null,
})

export function useHand() {
  const hand = computed(() => state.hand)

  const setHand = (from: number[], amount: number) => {
    state.hand = { from, amount }
  }

  const clearHand = () => {
    state.hand = null
  }

  return {
    hand,
    setHand,
    clearHand,
  }
}
