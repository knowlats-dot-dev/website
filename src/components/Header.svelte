<script lang="ts">
  import { SITE, SCREEN_WIDTH_BREAKPOINT } from '$/config'
  import Navbar from './Navbar.svelte'
  import NavbarMobileItems from './NavbarMobileItems.svelte'

  let screenWidth = SCREEN_WIDTH_BREAKPOINT
</script>

<svelte:window bind:innerWidth={screenWidth} />

<header class="header">
  <div class="header__logo">
    <a href="/" class="avatar">
      <img class="header__logo-img" src={SITE.logo} alt="Knowlats.dev logo" />
    </a>
    <h3 class="header__title">
      <a href="/">{SITE.name}</a>
    </h3>
  </div>
  <Navbar {screenWidth} />
</header>

{#if screenWidth <= SCREEN_WIDTH_BREAKPOINT}
  <NavbarMobileItems />
{/if}

<style lang="postcss">
  .header {
    @apply flex gap-4 items-center justify-between border-b py-3 sm:px-2;
  }

  .header__logo {
    @apply flex gap-2 items-center;
  }

  .header__logo-img {
    @apply w-16 h-16;
  }

  .header__title {
    @apply text-2xl font-extrabold md:text-4xl text-theme-primary dark:text-theme-dark-secondary;
  }
</style>
