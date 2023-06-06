<script lang="ts">
  import { NAV_ITEMS } from '$/config'
  import { toTitleCase } from '$/utils'
  import { isOpenMobileNavbar } from '../store/mobile-navbar'

  let mobileNavClass = 'mobile-nav hide'

  $: {
    mobileNavClass = $isOpenMobileNavbar ? 'mobile-nav show' : 'mobile-nav hide'
  }
</script>

<nav class={mobileNavClass}>
  {#each Object.keys(NAV_ITEMS) as navItemKey}
    <a
      href={NAV_ITEMS[navItemKey].path}
      title={NAV_ITEMS[navItemKey].title}
      class="mobile-nav-item">
      {toTitleCase(NAV_ITEMS[navItemKey].title)}
    </a>
  {/each}
</nav>

<style lang="postcss">
  .mobile-nav {
    @apply flex flex-col overflow-hidden w-full text-gray-700 dark:text-gray-400;
    &.hide {
      @apply max-h-0 border-0 transform transition-[max-height] duration-300 ease-out;
    }
    &.show {
      @apply max-h-screen border-b border-gray-200 dark:border-gray-700 transform transition-[max-height] duration-300 ease-in;
    }
  }

  .mobile-nav-item {
    @apply p-2 pl-8 w-full text-lg md:text-2xl hover:bg-gray-300 dark:hover:bg-gray-800 hover:underline decoration-dashed decoration-theme-primary dark:decoration-theme-dark-primary;
  }
</style>
