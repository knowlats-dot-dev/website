<script lang="ts">
  /** Ref: https://w3bits.com/animated-menu-icon-css */

  export let active
</script>

<div class={`hamburger ${active ? 'active' : ''}`}>
  <div></div>
</div>

<style lang="postcss">
  @reference "../../styles/global.css";
  .hamburger {
    @apply w-6;

    &::before,
    &::after,
    div {
      @apply bg-current block content-[''] rounded-sm h-1 my-1 mx-0 transition ease-in-out delay-200;
    }

    &.active {
      &::before {
        @apply translate-y-2 rotate-135;
      }
      &::after {
        @apply -translate-y-2 -rotate-135;
      }
      div {
        @apply scale-0;
      }
    }
  }
</style>
