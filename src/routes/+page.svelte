<script lang="ts">
    import { onMount } from 'svelte'
    import VideoRankingCard from "$lib/components/rankings/VideoRankingCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"

    // 定义时间范围选项
    const timeRanges = [
        { label: '日榜', value: 'day' },
        { label: '周榜', value: 'week' },
        { label: '月榜', value: 'month' },
        { label: '半年榜', value: 'half_year' },
        { label: '年榜', value: 'year' }
    ]

    // 状态管理
    let videos: any[] = []
    let loading = false
    let hasMore = true
    let currentPage = 1
    let selectedTimeRange = 'day'

    // 获取视频数据
    async function fetchVideos(page = 1, timeRange = selectedTimeRange) {
        if (loading) return

        loading = true
        try {
            const response = await fetch(`/api/rankings/videos?_page=${page}&_timeRange=${timeRange}`)
            const result = await response.json()

            if (page === 1) {
                videos = result.data.records
            } else {
                videos = [...videos, ...result.data.records]
            }

            hasMore = result.data.current * result.data.size < result.data.total
            currentPage = result.data.current
        } catch (error) {
            console.error('获取视频失败', error)
            hasMore = false
        } finally {
            loading = false
        }
    }

    // 改变时间范围
    function changeTimeRange(range: string) {
        selectedTimeRange = range
        currentPage = 1
        fetchVideos(1, range)
    }

    // 加载更多
    function loadMore() {
        if (!hasMore) return
        fetchVideos(currentPage + 1)
    }

    // 初始加载
    onMount(() => {
        fetchVideos()
    })
</script>

<div class="space-y-6">
    <!-- 时间范围选择器 -->
    <div class="flex justify-center space-x-4 mb-6">
        {#each timeRanges as range}
            <button 
                class="px-4 py-2 rounded-lg transition-all {selectedTimeRange === range.value 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                on:click={() => changeTimeRange(range.value)}
            >
                {range.label}
            </button>
        {/each}
    </div>

    <!-- 视频列表 -->
    <div class="space-y-4">
        {#each videos as video, index (video.id)}
            <VideoRankingCard 
                {video} 
                rank={index + 1} 
                timeRange={selectedTimeRange} 
            />
        {/each}
    </div>

    <!-- 加载更多触发器 -->
    <div>
        <LoadMoreTrigger 
            loading={loading} 
            {hasMore} 
            on:loadMore={loadMore}
        />
    </div>
</div>
