<script lang="ts">
  import { onMount } from 'svelte'
  import { theme } from '$/store/theme'

  type ThemeType = 'dark' | 'light'

  const THEME_DARK: ThemeType = 'dark'
  const THEME_LIGHT: ThemeType = 'light'
  let currTheme: ThemeType = THEME_DARK

  function toggleTheme() {
    const next = currTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK
    localStorage.setItem('theme', next)
    applyTheme(next)
  }

  function applyTheme(t: ThemeType) {
    window.document.documentElement.classList.toggle(
      THEME_DARK,
      t === THEME_DARK
    )
    currTheme = t
    theme.set(t)
  }

  onMount(() => {
    const stored = localStorage.getItem('theme') as ThemeType | null
    const mq = window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`)

    const initial = stored ?? (mq.matches ? THEME_DARK : THEME_LIGHT)
    if (!stored) localStorage.setItem('theme', initial)
    applyTheme(initial)

    const onOsChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT)
      }
    }
    mq.addEventListener('change', onOsChange)
    return () => mq.removeEventListener('change', onOsChange)
  })
</script>

<button id="theme" aria-label="Theme" on:click={toggleTheme}>
  <slot theme={currTheme} />
</button>
