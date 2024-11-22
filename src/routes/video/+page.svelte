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

    // 添加模态框状态
    let showAddVideoModal = $state(false)

    // 打开模态框的函数
    function openAddVideoModal() {
        showAddVideoModal = true
    }

    // 关闭模态框的函数
    function closeAddVideoModal() {
        showAddVideoModal = false
    }
</script>

<div class="container mx-auto space-y-6 px-4 py-8">
    {#if isAdmin}
        <div class="mb-4 flex justify-end">
            <button
                class="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                onclick={openAddVideoModal}>
                添加视频
            </button>
        </div>
    {/if}

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

    {#if showAddVideoModal}
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="w-96 rounded-lg bg-white p-6">
                <div class="mb-4 flex items-center justify-between">
                    <h2 class="text-xl font-bold">添加视频</h2>
                    <button class="text-gray-500 hover:text-gray-700" onclick={closeAddVideoModal}>
                        ✕
                    </button>
                </div>
                <!-- 这里添加添加视频的表单 -->
                <div class="space-y-4">
                    <div>
                        <label class="mb-2 block"
                            >视频链接
                            <input
                                type="text"
                                class="w-full rounded-md border p-2"
                                placeholder="请输入视频id或链接" />
                        </label>
                    </div>
                    <div class="flex justify-end space-x-2">
                        <button
                            class="rounded-md bg-gray-200 px-4 py-2 text-gray-700"
                            onclick={closeAddVideoModal}>
                            取消
                        </button>
                        <button 
                            class="rounded-md bg-green-500 px-4 py-2 text-white"
                            onclick={() => {/* 添加处理逻辑 */}}>
                            确认
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
