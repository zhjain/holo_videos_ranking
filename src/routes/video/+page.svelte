<script lang="ts">
    import VideoCard from "$lib/components/videos/VideoCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"
    import { userStore } from "$lib/stores/userStore"

    const isAdmin = $derived($userStore?.is_admin)

    let { data } = $props()

    // 使用 {#await} 处理异步数据
    const videosPromise = $derived(data.videos)

    function loadMore() {
        console.log("load more")
    }
</script>

{#await videosPromise}
    <div>加载中...</div>
{:then videoData}
    <div class="flex flex-col justify-center gap-4">
        {#each videoData.records as video}
            <VideoCard {video} {isAdmin} />
        {/each}
    </div>

    {#if videoData.hasMore}
        <div class="mt-6 flex justify-center">
            <LoadMoreTrigger loading={false} hasMore={videoData.hasMore} {loadMore} />
        </div>
    {/if}
{:catch error}
    <div class="text-center text-red-500">加载失败: {error.message}</div>
{/await}
