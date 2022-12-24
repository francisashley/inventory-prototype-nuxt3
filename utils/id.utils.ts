/**
 * Generate random id
 */
export const generateId = (): number => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
}
