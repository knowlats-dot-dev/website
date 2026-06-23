<script lang="ts">
  import { fade } from 'svelte/transition'
  import ModeSwitcher from './ModeSwitcher.svelte'
  import MoonIcon from './icons/MoonIcon.svelte'
  import SunIcon from './icons/SunIcon.svelte'
</script>

<ModeSwitcher let:theme>
  <span class="icon-wrapper">
    {#if theme === 'dark'}
      <span in:fade={{ duration: 200 }} out:fade={{ duration: 200 }} class="icon">
        <SunIcon />
      </span>
    {:else}
      <span in:fade={{ duration: 200 }} out:fade={{ duration: 200 }} class="icon">
        <MoonIcon />
      </span>
    {/if}
  </span>
</ModeSwitcher>

<style lang="postcss">
  @reference "../styles/global.css";
  .icon-wrapper {
    @apply relative inline-flex w-6 h-6;
  }

  .icon {
    @apply absolute top-0 left-0;
  }
</style>
