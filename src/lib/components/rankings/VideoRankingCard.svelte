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
                <a
                    href={`https://www.youtube.com/watch?v=${video.video_id}`}
                    target="_blank"
                    aria-label={`跳转到${video.video_title}源视频`}>
                    <img src={video.video_cdn_pic}
                        alt={video.video_title}
                        loading="lazy"
                        width={320}
                        height={180}
                        class="h-full w-full object-cover" />
                </a>
                <div class="absolute bottom-2 right-2 rounded bg-black/80 px-1 text-xs text-white">
                    {formatDuration(video.parsed_duration)}
                </div>
            </div>
        </div>

        <!-- 右侧视频信息 -->
        <div class="flex flex-1 flex-col gap-2 p-4">
            <h3 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                {video.video_title}
            </h3>
            <div class="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div class="flex items-center space-x-2">
                    <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700">
                        {#if video.owner_channel_avatar}
                            <img src={video.owner_channel_avatar} alt={video.owner_channel_title} loading="lazy" class="h-full w-full rounded-full object-cover" />
                        {/if}
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {video.owner_channel_title}
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                            发布于 {formatDate(video.publish_time)}
                        </span>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 md:ml-auto">
                    <div class="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span class="text-gray-700 dark:text-gray-300 font-semibold">
                            {formatViewCount(video.video_view_count)} 次观看
                        </span>
                    </div>
                    <div class="flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>
                            {getTimeRangeLabel(timeRange)}：{formatViewCount(video.view_growth || 0)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 