import { reactive, computed } from 'vue'

type payload = {
  from: string[]
  amount: number
}

const state = reactive<{ payload: payload | null }>({
  payload: null,
})

export function useState() {
  const payload = computed(() => state.payload)

  const setPayload = (from: string[], amount: number) => {
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
