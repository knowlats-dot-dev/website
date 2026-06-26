<script lang="ts">
  import { theme } from '$/store/theme.svelte'
</script>

{#if theme.value === 'dark'}
  <slot name="dark" />
{:else}
  <slot name="light" />
{/if}
