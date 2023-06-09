<script lang="ts">
  import SearchIcon from './icons/SearchIcon.svelte'
  import { isSearchVisible } from '../store/search'
  import { isOpenMobileNavbar } from '$/store/mobile-navbar'

  function showSearchDialog() {
    isSearchVisible.set(true)
    isOpenMobileNavbar.set(false)
    const mainBody = document.getElementById('main-body')
    if (mainBody) {
      mainBody.style.overflowY = 'hidden'
    }
  }
</script>

<button id='search' aria-label="Search" on:click={showSearchDialog}>
  <SearchIcon />
</button>
