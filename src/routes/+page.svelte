<script lang="ts">
    import { goto } from "$app/navigation"
    import VideoRankingCard from "$lib/components/rankings/VideoRankingCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"

    // 定义时间范围选项
    const timeRanges = [
        { label: "日榜", value: "day" },
        { label: "周榜", value: "week" },
        { label: "月榜", value: "month" },
        { label: "半年榜", value: "half_year" },
        { label: "年榜", value: "year" }
    ]

    let { data } = $props()

    const rankingsPromise = $derived(data.rankings)

    let selectedTimeRange = $state(timeRanges[0].value)

    function changeTimeRange(value: string) {
        selectedTimeRange = value
        goto(`?timeRange=${value}&page=1`)
    }

    function loadMore() {
        console.log("load more")
    }
</script>

<div class="space-y-6">
    <!-- 时间范围选择器 -->
    <div class="mb-6 flex justify-center space-x-4">
        {#each timeRanges as range}
            <button
                class="rounded-lg px-4 py-2 transition-all {selectedTimeRange === range.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                onclick={() => changeTimeRange(range.value)}>
                {range.label}
            </button>
        {/each}
    </div>

    <!-- 视频列表 -->
    <div class="space-y-4 min-h-screen">
        {#await rankingsPromise}
            <div>加载中...</div>
        {:then rankingsData}
            {#each rankingsData.records as video, index (video.id)}
                <VideoRankingCard {video} rank={index + 1} timeRange={selectedTimeRange} />
            {/each}
            {#if rankingsData.hasMore}
                <LoadMoreTrigger {loadMore} loading={false} hasMore={rankingsData.hasMore} />
            {/if}
        {/await}
    </div>
</div>
