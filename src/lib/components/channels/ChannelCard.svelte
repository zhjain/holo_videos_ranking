<script lang="ts">
    export let channel: any

    function formatSubscriberCount(count: number): string {
        if (count >= 10000) {
            return `${(count / 10000).toFixed(1)}万`
        }
        return count.toString()
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString)
        console.log(date);
        console.log(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
</script>

<div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
    <div class="p-4">
        <div class="flex items-center space-x-4">
            <img 
                src={channel.channel_cdn_avatar} 
                alt={channel.channel_title} 
                onerror={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                        e.target.src = channel.channel_cdn_avatar_backup
                    }
                }}
                class="w-16 h-16 rounded-full object-cover"
            />
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {channel.channel_title}
                </h3>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    <span>{formatSubscriberCount(channel.channel_subscriber_count)} 订阅者</span>
                    <span class="ml-2">•</span>
                    <span class="ml-2">创建于 {formatDate(channel.channel_created_time)}</span>
                </div>
            </div>
        </div>
        
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {channel.channel_description || '暂无描述'}
        </div>
    </div>
</div> 