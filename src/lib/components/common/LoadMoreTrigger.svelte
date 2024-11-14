<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    export let loading = false
    export let hasMore = false

    const dispatch = createEventDispatcher()

    function handleLoadMore() {
        dispatch('loadMore')
    }
</script>

<div class="flex h-20 items-center justify-center">
    {#if loading}
        <div class="text-gray-600 dark:text-gray-400">加载中...</div>
    {:else if hasMore}
        <button 
            on:click={handleLoadMore}
            class="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
        >
            点击加载更多
        </button>
    {:else}
        <div class="text-gray-600 dark:text-gray-400">没有更多数据了</div>
    {/if}
</div> 