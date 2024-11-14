<script lang="ts">
    import { onMount } from "svelte"
    import { invalidate } from "$app/navigation"
    import type { PageData } from "./$types"
    import VideoRankingCard from "$lib/components/rankings/VideoRankingCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"

    export let data: PageData

    // 定义时间范围选项
    const timeRanges = [
        { label: "日榜", value: "daily" },
        { label: "周榜", value: "weekly" },
        { label: "月榜", value: "monthly" },
        { label: "半年榜", value: "half-yearly" },
        { label: "年榜", value: "yearly" }
    ]

    // 当前选中的时间范围
    let selectedTimeRange = "weekly"
    let loading = false
    let page = 1

    async function loadMore() {
        if (loading || !data.hasMore) return

        loading = true
        try {
            page++
            await invalidate(`/api/rankings/videos?_page=${page}&timeRange=${selectedTimeRange}`)
        } finally {
            loading = false
        }
    }

    async function changeTimeRange(range: string) {
        selectedTimeRange = range
        page = 1
        loading = true
        try {
            await invalidate(`/api/rankings/videos?_page=1&timeRange=${range}`)
        } finally {
            loading = false
        }
    }

    let observer: IntersectionObserver
    let loadMoreTrigger: HTMLDivElement

    onMount(() => {
        if (!loadMoreTrigger) return

        observer = new IntersectionObserver(
            entries => {
                const first = entries[0]
                if (first.isIntersecting && data.hasMore && !loading) {
                    loadMore()
                }
            },
            {
                threshold: 0.1 // 当触发器至少10%可见时触发
            }
        )

        observer.observe(loadMoreTrigger)

        return () => {
            if (observer) observer.disconnect()
        }
    })
</script>

<div class="space-y-6">
    <!-- 时间范围选择器 -->
    <div class="mb-6 flex justify-center space-x-4">
        {#each timeRanges as range}
            <button
                class="rounded-lg px-4 py-2 transition-all {selectedTimeRange === range.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                on:click={() => changeTimeRange(range.value)}>
                {range.label}
            </button>
        {/each}
    </div>

    <!-- 视频列表 -->
    <div class="space-y-4">
        {#each data.videos as video, index (video.id)}
            <VideoRankingCard {video} rank={index + 1} timeRange={selectedTimeRange} />
        {/each}
    </div>

    <!-- 加载更多触发器 -->
    <div bind:this={loadMoreTrigger}>
        <LoadMoreTrigger {loading} hasMore={data.hasMore} on:loadMore={loadMore} />
    </div>
</div>
