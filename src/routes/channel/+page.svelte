<script lang="ts">
    import ChannelCard from "$lib/components/channels/ChannelCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"

    export let data
</script>

<div class="container mx-auto space-y-6 px-4 py-8">
    <h1 class="mb-4 text-2xl font-bold">频道列表 (共 {data.pagination.total} 个频道)</h1>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each data.channels as channel (channel.id)}
            <ChannelCard {channel} />
        {/each}
    </div>

    <LoadMoreTrigger loading={false} hasMore={data.hasMore} />
</div>
