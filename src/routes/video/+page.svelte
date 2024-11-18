<script lang="ts">
    import VideoCard from "$lib/components/videos/VideoCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"
    import { userStore } from "$lib/stores/userStore"

    $: isAdmin = $userStore?.is_admin

    export let data

    // 使用 {#await} 处理异步数据
    $: videosPromise = data.videos
</script>

{#await videosPromise}
    <div>加载中...</div>
{:then videoData} 
    {#each videoData.records as video}
        <VideoCard {video} {isAdmin} />
    {/each}

    {#if videoData.hasMore}
        <LoadMoreTrigger loading={false} hasMore={videoData.hasMore} />
    {/if}
{:catch error}
    <div>加载失败: {error.message}</div>
{/await}
