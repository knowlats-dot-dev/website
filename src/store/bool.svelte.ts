export function createBooleanStore(initial = false) {
  let val = $state(initial)
  return {
    get value() {
      return val
    },
    set(v: boolean) {
      val = v
    },
  }
}
