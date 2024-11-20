<script lang="ts">
    let { video, rank = null, timeRange = 'week' } = $props()

    function formatViewCount(count: number): string {
        if (count >= 10000) {
            return `${(count / 10000).toFixed(1)}万`
        }
        return count.toString()
    }

    function formatDuration(duration: number): string {
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString)
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    function getRankColor(rank: number) {
        switch(rank) {
            case 1: return 'bg-yellow-500 text-white'
            case 2: return 'bg-gray-400 text-white'
            case 3: return 'bg-yellow-700 text-white'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    // 根据时间范围显示增量标签
    function getTimeRangeLabel(timeRange: string): string {
        const labels = {
            'day': '日增量',
            'week': '周增量',
            'month': '月增量',
            'half_year': '半年增量',
            'year': '年增量',
            'all': '总观看量'
        }
        return labels[timeRange as keyof typeof labels] || '增量'
    }
</script>

<div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 relative">
    {#if rank !== null}
        <div class="absolute top-2 left-2 z-10">
            <div class={`
                w-10 h-10 flex items-center justify-center 
                rounded-full font-bold ${getRankColor(rank)}
            `}>
                {rank}
            </div>
        </div>
    {/if}

    <div class="flex flex-col md:flex-row">
        <!-- 左侧视频缩略图 -->
        <div class="relative md:w-80">
            <div class="aspect-video">
                <img
                    src={video.video_pic}
                    alt={video.video_title}
                    class="h-full w-full object-cover"
                />
                <div class="absolute bottom-2 right-2 rounded bg-black/80 px-1 text-xs text-white">
                    {formatDuration(video.parsed_duration)}
                </div>
            </div>
        </div>

        <!-- 右侧视频信息 -->
        <div class="flex flex-1 flex-col p-4">
            <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {video.video_title}
            </h3>
            
            <div class="mb-4 text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-2">
                    <span>{formatViewCount(video.video_view_count)} 次观看</span>
                    <span>•</span>
                    <span>发布于 {formatDate(video.publish_time)}</span>
                    <span class="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {getTimeRangeLabel(timeRange)}：{formatViewCount(video.view_growth || 0)}
                    </span>
                </div>
            </div>

            <div class="flex items-center space-x-2">
                <div class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <span class="text-sm text-gray-700 dark:text-gray-300">
                    {video.owner_channel_title}
                </span>
            </div>
        </div>
    </div>
</div> 