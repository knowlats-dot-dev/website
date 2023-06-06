<script lang="ts">
  import ModeSwitcher from './ModeSwitcher.svelte'
  import MoonIcon from './icons/MoonIcon.svelte'
  import SunIcon from './icons/SunIcon.svelte'
</script>

<ModeSwitcher let:theme>
  {#if theme === 'dark'}
    <SunIcon />
  {:else}
    <MoonIcon />
  {/if}
</ModeSwitcher>
