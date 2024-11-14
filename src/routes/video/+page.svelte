<script lang="ts">
    import VideoCard from "$lib/components/videos/VideoCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"

    export let data
</script>

<div class="container mx-auto space-y-6 px-4 py-8">
    <h1 class="mb-4 text-2xl font-bold">视频列表 (共 {data.pagination.total} 个视频)</h1>

    <div class="space-y-4">
        {#each data.videos as video, index (video.id)}
            <VideoCard {video} />
        {/each}
    </div>

    <LoadMoreTrigger 
        loading={false} 
        hasMore={data.hasMore} 
    />
</div>
