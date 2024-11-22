<script lang="ts">
    import { goto } from "$app/navigation"
    import ChannelCard from "$lib/components/channels/ChannelCard.svelte"
    import Pagination from "$lib/components/common/Pagination.svelte"

    import { userStore } from "$lib/stores/userStore"

    let { data } = $props()
    let search = $state("")


    $effect(() => {
        console.log(search)
        goto(`/channel?q=${search}`)
    })

    const channelsPromise = $derived(data.channels)
    // console.log(channelsPromise);

    function loadMore() {
        console.log("load more")
    }
</script>

<div class="container mx-auto space-y-6 px-4 py-8">
    {#await channelsPromise}
        <div>加载中...</div>
    {:then channelData}
        <!-- 操作行 -->
        <div class="mb-4 flex items-center justify-between">
            <div class="flex space-x-2">
                <!-- 筛选下拉菜单 -->

                <!-- 仅管理员可见的操作 -->
                {#if $userStore.isAdmin}
                    <!-- 替换为实际的管理员权限检查 -->
                    <button class="btn btn-sm btn-primary"> 添加频道 </button>
                {/if}
            </div>

            <!-- 搜索框 -->
            <!-- <input
                type="text"
                placeholder="搜索频道"
                class="input input-bordered input-sm w-full max-w-xs"
                bind:value={search} /> -->
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {#each channelData.records as channel (channel.id)}
                <ChannelCard {channel} />
            {/each}
        </div>

        <Pagination
            current={channelData.pagination.current}
            total={channelData.pagination.total}
            size={channelData.pagination.size}
            basePath="/channel" />
    {:catch error}
        <div>加载失败: {error.message}</div>
    {/await}
</div>
