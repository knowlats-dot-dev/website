<script lang="ts">
  import HamburgerIcon from './icons/HamburgerIcon.svelte'
  import { isOpenMobileNavbar } from '../store/mobile-navbar'

  const onClickMobileNavbarButton = () =>
    isOpenMobileNavbar.set(!$isOpenMobileNavbar)
</script>

<button id='navbar-button' aria-label='Navbar' on:click={onClickMobileNavbarButton}>
  <HamburgerIcon active={$isOpenMobileNavbar} />
</button>
