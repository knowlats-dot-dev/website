<script lang="ts">
  import HamburgerIcon from './icons/HamburgerIcon.svelte'
  import { isOpenMobileNavbar } from '$/store/mobile-navbar.svelte'

  const onClickMobileNavbarButton = () =>
    isOpenMobileNavbar.set(!isOpenMobileNavbar.value)
</script>

<button
  id="navbar-button"
  aria-label="Navbar"
  on:click={onClickMobileNavbarButton}
>
  <HamburgerIcon active={isOpenMobileNavbar.value} />
</button>
