<script lang="ts">
    import ChannelCard from "$lib/components/channels/ChannelCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"

    let { data } = $props()

    const channelsPromise = $derived(data.channels)
    // console.log(channelsPromise);

    function loadMore() {
        console.log("load more")
    }
</script>

<div class="container mx-auto space-y-6 px-4 py-8">
    <h1 class="mb-4 text-2xl font-bold">频道列表</h1>
    {#await channelsPromise}
        <div>加载中...</div>
    {:then channelData}
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {#each channelData.records as channel (channel.id)}
                <ChannelCard {channel} />
            {/each}
        </div>

        {#if channelData.hasMore}
            <LoadMoreTrigger {loadMore} loading={false} hasMore={channelData.hasMore} />
        {/if}
    {:catch error}
        <div>加载失败: {error.message}</div>
    {/await}
</div>
