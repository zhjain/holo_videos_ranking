<script lang="ts">
    let { loading = false, hasMore = false, loadMore } = $props()
</script>

<div class="flex h-20 items-center justify-center">
    {#if loading}
        <div class="text-gray-600 dark:text-gray-400">加载中...</div>
    {:else if hasMore}
        <button
            onclick={() => loadMore()}
            class="text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400">
            点击加载更多
        </button>
    {:else}
        <div class="text-gray-600 dark:text-gray-400">没有更多数据了</div>
    {/if}
</div>
