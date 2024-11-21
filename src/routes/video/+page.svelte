<script lang="ts">
    import VideoCard from "$lib/components/videos/VideoCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"
    import { userStore } from "$lib/stores/userStore"
    import { customFetch } from "$lib/api.js"
    import { goto } from "$app/navigation"
    import Pagination from "$lib/components/common/Pagination.svelte"

    const isAdmin = $derived($userStore?.isAdmin)

    let { data } = $props()

    // 使用 {#await} 处理异步数据
    const videosPromise = $derived(data.videos)

    async function onVideoTypeChange(videoId: string, type: string) {
        console.log("onVideoTypeChange", videoId, type)
        const { code, message } = await customFetch(`/api/videos/${videoId}`, {
            method: "PUT",
            body: JSON.stringify({
                video_type: type
            })
        })
        if (code === 200) {
            return true
        } else {
            return false
        }
    }

    async function onVideoDelete(videoId: string) {
        console.log("onVideoDelete", videoId)
    }
</script>

<div class="container mx-auto space-y-6 px-4 py-8">
    {#await videosPromise}
        <div>加载中...</div>
    {:then videoData}
        <div class="flex flex-col justify-center gap-4">
            {#each videoData.records as video}
                <VideoCard {video} {isAdmin} {onVideoTypeChange} {onVideoDelete} />
            {/each}
        </div>

        <Pagination
            current={videoData.pagination.current}
            total={videoData.pagination.total}
            size={videoData.pagination.size}
            basePath="/video" />
    {:catch error}
        <div class="text-center text-red-500">加载失败: {error.message}</div>
    {/await}
</div>
