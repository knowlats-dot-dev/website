<script lang="ts">
  import { isSearchVisible } from '$/store/search'
  import Search from './Search.svelte'

  const dismissModal = () => {
    isSearchVisible.set(false)
    const mainBody = document.getElementById('main-body')
    if (mainBody) {
      mainBody.style.overflowY = 'auto'
    }
  }
  const handleEsc = (event) => {
    if (event.key === 'Escape') {
      dismissModal()
    }
  }
</script>

{#if $isSearchVisible}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal__backdrop" on:click={dismissModal} on:keydown={handleEsc}></div>
  <div class="modal">
    <div class="modal__cnt">
      <Search />
    </div>
  </div>
{/if}

<style lang="postcss">
  @reference "../styles/global.css";
  .modal {
    @apply absolute top-0 left-0 w-full h-full grid justify-center content-center pointer-events-none;
  }
  .modal__backdrop {
    @apply absolute top-0 left-0 w-full h-screen opacity-50 bg-gradient-to-tr from-fuchsia-600 to-fuchsia-900 z-0;
  }
  .modal__cnt {
    @apply w-full z-10 pointer-events-auto;
  }
</style>
