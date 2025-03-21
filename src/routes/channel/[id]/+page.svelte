<script lang="ts">
    import { onMount } from 'svelte'
    import { goto } from "$app/navigation"

    let { data } = $props()

    let channelDetail = $derived(data.channel)

    onMount(() => {
        console.log(channelDetail)
        if (!channelDetail) {
            goto('/channel') // 如果没有频道详情，重定向到频道列表
        }
    })
</script>

<div class="container mx-auto space-y-6 px-4 py-8">
    {#if channelDetail}
        <h1 class="text-2xl font-bold">{channelDetail.name}</h1>
        <p>{channelDetail.description}</p>
        <!-- 其他频道详细信息 -->
    {:else}
        <div>加载中...</div>
    {/if}
</div> 