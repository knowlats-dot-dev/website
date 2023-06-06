<script lang="ts">
  import { SCREEN_WIDTH_BREAKPOINT } from '$/config'
  import NavbarItems from './NavbarItems.svelte'
  import ModeSwitcherBtn from './ModeSwitcherBtn.svelte'
  import SearchBtn from './SearchBtn.svelte'
  import NavbarBtn from './NavbarBtn.svelte'

  export let screenWidth: number
</script>

<ul class="navbar">
  {#if screenWidth > SCREEN_WIDTH_BREAKPOINT}
    <li>
      <NavbarItems />
    </li>
  {/if}
  <li>
    <SearchBtn />
  </li>
  <li>
    <ModeSwitcherBtn />
  </li>
  {#if screenWidth <= SCREEN_WIDTH_BREAKPOINT}
    <li>
      <NavbarBtn />
    </li>
  {/if}
</ul>

<style lang="postcss">
  .navbar {
    @apply flex gap-6 text-gray-600 items-center;
  }
</style>
