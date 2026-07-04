type ThemeType = 'dark' | 'light'

function createThemeStore() {
  let val = $state<ThemeType>('dark')
  return {
    get value() {
      return val
    },
    set(v: ThemeType) {
      val = v
    }
  }
}

export const theme = createThemeStore()
