<script lang="ts">
  import { onMount } from 'svelte'
  import lunr from 'lunr'
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

  let searchInput: HTMLInputElement
  let docsById: Record<string, SearchDoc> = {}
  let idx: lunr.Index | null = null

  let searchQuery = ''
  let searchResults: SearchDoc[] = []

  onMount(async () => {
    const [stemmer, multi, wordcut, thai] = await Promise.all([
      import('lunr-languages/lunr.stemmer.support'),
      import('lunr-languages/lunr.multi'),
      import('lunr-languages/wordcut'),
      import('lunr-languages/lunr.th')
    ])
    stemmer.default(lunr)
    multi.default(lunr)
    ;(lunr as any).wordcut = wordcut.default
    thai.default(lunr)

    // lunr.th.tokenizer returns plain strings on the segmenter path, but lunr 2.x
    // requires Token objects — patch it to always wrap in lunr.Token
    const origThTokenizer = (lunr as any).th.tokenizer
    ;(lunr as any).th.tokenizer = (obj: any) => {
      const tokens: any[] = origThTokenizer(obj)
      return tokens.map((t: any) =>
        t instanceof (lunr as any).Token ? t : new (lunr as any).Token(t)
      )
    }

    const docs: SearchDoc[] = await (await fetch('/search-index.json')).json()
    docsById = Object.fromEntries(docs.map((d) => [d.id, d]))

    idx = lunr(function (this: lunr.Builder) {
      this.use((lunr as any).multiLanguage('en', 'th'))
      this.ref('id')
      this.field('title', { boost: 10 })
      this.field('description', { boost: 5 })
      this.field('tags', { boost: 3 })
      this.field('body')
      docs.forEach((d) => this.add({ ...d, tags: d.tags?.join(' ') ?? '' }))
    })

    searchInput.focus()
  })

  $: {
    searchResults = []
    if (idx && searchQuery.length >= 2) {
      try {
        searchResults = idx
          .search(searchQuery + '*')
          .map((r) => docsById[r.ref])
          .filter(Boolean)
      } catch {
        // lunr throws QueryParseError on special characters
      }
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
