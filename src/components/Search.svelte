<script lang="ts">
  import { onMount } from 'svelte'
  import SearchIcon from './icons/SearchIcon.svelte'
  import PostSearchPreview from './PostSearchPreview.svelte'
  type SearchDoc = {
    id: string
    slug?: string
    title: string
    description: string
    category?: string
    tags: string[]
    body?: string
  }

  let searchInput
  let searchableDocs: SearchDoc[] = []
  let searchIndex

  let searchQuery = ''
  let searchResults: SearchDoc[] = []

  onMount(async () => {
    const lunr = (await import('lunr')).default
    const resp = await fetch('/search-index.json')
    const docs = await resp.json()
    searchableDocs = docs.map(
      (doc: Omit<SearchDoc, 'id'> & { id?: string }) => ({
        ...doc,
        id: doc.id ?? doc.slug ?? ''
      })
    )
    // Initialize indexing
    searchIndex = lunr(function () {
      // the match key...
      this.ref('id')

      // indexable properties
      this.field('title')
      this.field('description')
      this.field('tags')

      // Omit, if you don't want to search on `body`
      this.field('body')

      // Index every document
      searchableDocs.forEach((doc) => {
        this.add(doc)
      }, this)
    })
    searchInput.focus()
  })

  $: {
    if (searchQuery && searchQuery.length >= 3) {
      const matches = searchIndex.search(searchQuery)
      searchResults = []
      matches.map((match) => {
        searchableDocs.filter((doc) => {
          if (match.ref === doc.id) {
            searchResults.push(doc)
          }
        })
      })
    }
  }
</script>

<div class="search">
  <div class="search__ctrl">
    <label for="search"><SearchIcon found={searchResults.length > 0} /></label>
    <input
      type="text"
      name="search"
      bind:this={searchInput}
      placeholder="What are you looking for?"
      bind:value={searchQuery}
    />
  </div>
  <div class="search__results">
    {#if searchResults.length}
      {#each searchResults as post, i}
        <PostSearchPreview {post} isLast={i === searchResults.length - 1} />
      {/each}
    {:else}
      <div class="search__results--none">
        {#if searchQuery.length}
          No matching items found!
        {:else}
          Search something and let me find it for you! :-)
        {/if}
      </div>
    {/if}
  </div>
  <div class="note"><small>click anywhere outside to close</small></div>
</div>

<style lang="postcss">
  @reference "../styles/global.css";
  .search {
    @apply w-full relative bg-theme-primary  p-8  rounded-md shadow-lg;
  }
  input {
    @apply w-full px-4 py-2 pl-10 text-xl font-semibold text-gray-600 border-0 shadow-inner rounded-md bg-gray-100 placeholder-theme-dark-secondary;
  }
  .search__ctrl {
    @apply pb-4 relative;
  }
  .search__ctrl label {
    @apply text-theme-primary absolute top-2 left-2;
  }
  .search__results {
    @apply w-96 h-64 py-4 overflow-y-auto;
  }
  .search__results--none {
    @apply text-center text-theme-dark-primary;
  }
  .note {
    @apply w-full text-center text-white;
  }
</style>
