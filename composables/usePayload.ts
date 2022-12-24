import { reactive, computed } from 'vue'

type payload = {
  from: number[]
  amount: number
}

const state = reactive<{ payload: payload | null }>({
  payload: null,
})

export function usePayload() {
  const payload = computed(() => state.payload)

  const setPayload = (from: number[], amount: number) => {
    state.payload = { from, amount }
  }

  const clearPayload = () => {
    state.payload = null
  }

  return {
    payload,
    setPayload,
    clearPayload,
  }
}
