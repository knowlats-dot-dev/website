<script lang="ts">
  import { toTitleCase } from '$/utils'
  import { NAV_ITEMS } from '$/config'

  const pathname = window.location.pathname
</script>

<nav class="nav py-3">
  <ul class="nav-list">
    {#each Object.keys(NAV_ITEMS) as navItemKey}
      <li>
        {#if pathname === NAV_ITEMS[navItemKey].path}
          <span class="nav-item-active">
            {toTitleCase(NAV_ITEMS[navItemKey].title)}
          </span>
        {:else}
          <a
            class="nav-item"
            href={NAV_ITEMS[navItemKey].path}
            title={NAV_ITEMS[navItemKey].title}>
            {toTitleCase(NAV_ITEMS[navItemKey].title)}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style lang="postcss">
  .nav-list {
    @apply inline-flex list-none gap-6 text-xl font-semibold text-gray-500 py-2 flex-wrap;
  }

  .nav-item {
    @apply pb-1 border-b-2 hover:border-dashed hover:border-gray-400 hover:dark:border-theme-dark-primary border-gray-300 dark:border-gray-800;
  }

  .nav-item-active {
    @apply pb-1 border-b-2 border-theme-primary dark:border-theme-dark-secondary cursor-default;
  }
</style>
