<script lang="ts">
  /** Ref: https://w3bits.com/animated-menu-icon-css */

  export let active
</script>

<div class={`hamburger ${active ? 'active' : ''}`}>
  <div />
</div>

<style lang="postcss">
  .hamburger {
    @apply w-6;

    &::before,
    &::after,
    div {
      @apply bg-current block content-[''] rounded-sm h-1 my-1 mx-0 transition ease-in-out delay-200;
    }

    &.active {
      &::before {
        @apply translate-y-2 rotate-[135deg];
      }
      &::after {
        @apply -translate-y-2 -rotate-[135deg];
      }
      div {
        @apply scale-0;
      }
    }
  }
</style>
