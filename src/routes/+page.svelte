<script lang="ts">
    import { goto } from "$app/navigation"
    import VideoRankingCard from "$lib/components/rankings/VideoRankingCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"
    import { onMount } from "svelte"
    import { customFetch } from "$lib/api.js"

    // 定义时间范围选项
    const timeRanges = [
        { label: "全部", value: "all" },
        { label: "日榜", value: "day" },
        { label: "周榜", value: "week" },
        { label: "月榜", value: "month" },
        { label: "半年榜", value: "half_year" },
        { label: "年榜", value: "year" }
    ]

    // 定义视频类型选项
    const videoTypes = [
        { label: "全部", value: "all" },
        { label: "原创", value: "origin" },
        { label: "翻唱", value: "cover" },
        { label: "现场", value: "live" }
    ]

    let { data } = $props()

    let rankings = $state(data.records)
    let currentPage = $state(1)
    let loading = $state(false)
    let hasMore = $state(true)
    let isSSR = $state(true)

    let selectedTimeRange = $state(timeRanges[5].value)
    let selectedVideoType = $state(videoTypes[0].value)

    function changeTimeRange(value: string) {
        if (selectedTimeRange === value) return
        currentPage = 1
        selectedTimeRange = value
        loadRankings()
    }

    function changeVideoType(value: string) {
        if (selectedVideoType === value) return
        currentPage = 1
        selectedVideoType = value
        loadRankings()
    }

    async function loadRankings() {
        loading = true
        if (currentPage === 1) rankings = []
        try {
            const { data } = await customFetch<any>(
                `/api/rankings/videos?page=${currentPage}&limit=20&type=${selectedVideoType}&timeRange=${selectedTimeRange}`
            )
            // const { data } = await res.json()
            console.log(data)
            rankings = [...rankings, ...data.records]
        } catch (error) {
            console.error("加载失败:", error)
        } finally {
            loading = false
        }
    }

    onMount(async () => {
        // await loadRankings()
        // rankings = data.records
        isSSR = false
        console.log("页面加载完成")
    })

    function loadMore() {
        if (loading) return
        currentPage++
        console.log("load more")
        loadRankings()
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

    <!-- 视频类型选择器 -->
    <!-- <div class="mb-6 flex justify-center space-x-4">
        {#each videoTypes as type}
            <button
                class="rounded-lg px-4 py-2 transition-all {selectedVideoType === type.value
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                onclick={() => changeVideoType(type.value)}>
                {type.label}
            </button>
        {/each}
    </div> -->

    <!-- 视频列表 -->
    <div class="min-h-screen space-y-4">
        {#each rankings as video, index}
            <VideoRankingCard {video} rank={index + 1} timeRange={selectedTimeRange} />
        {/each}
        <LoadMoreTrigger {loading} {hasMore} {loadMore} />
    </div>
</div>
