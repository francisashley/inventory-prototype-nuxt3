export function useSizeObserver(elRef) {
  const widthRef = ref(0)
  const heightRef = ref(0)
  let resizeObserver = null

  onMounted(() => {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        widthRef.value = entry.contentRect.width
        heightRef.value = entry.contentRect.height
      }
    })
    resizeObserver.observe(elRef.value)
  })
  onBeforeUnmount(() => resizeObserver?.unobserve(elRef.value))
  return {
    widthRef,
    heightRef,
  }
}
