<script lang="ts">
  import HamburgerIcon from './icons/HamburgerIcon.svelte'
  import { isOpenMobileNavbar } from '../store/mobile-navbar'

  const onClickMobileNavbarButton = () =>
    isOpenMobileNavbar.set(!$isOpenMobileNavbar)
</script>

<button on:click={onClickMobileNavbarButton}>
  <HamburgerIcon active={$isOpenMobileNavbar} />
</button>
