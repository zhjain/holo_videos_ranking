<script lang="ts">
    import VideoCard from "$lib/components/videos/VideoCard.svelte"
    import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte"
    import { userStore } from "$lib/stores/userStore"
    import { customFetch } from "$lib/api.js"
    import { goto } from "$app/navigation"
    import Pagination from "$lib/components/common/Pagination.svelte"
    import Modal from "$lib/components/common/Modal.svelte"

    let showModal = $state(false)

    const isAdmin = $derived($userStore?.isAdmin)

    let { data } = $props()

    const videosPromise = $derived(data.videos)

    let videoLink = $state("")

    async function handleAddVideo() {
        if (videoLink.trim()) {
            console.log("添加视频:", videoLink)
            const res = await customFetch('')
            videoLink = ""
            showModal = false
        }
    }
</script>

<div class="container mx-auto space-y-6 px-4 py-8">
    {#if isAdmin}
        <div class="mb-4 flex justify-end">
            <button
                class="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                onclick={() => (showModal = true)}>
                添加视频
            </button>
        </div>
    {/if}

    {#await videosPromise}
        <div>加载中...</div>
    {:then videoData}
        <div class="flex flex-col justify-center gap-4">
            {#each videoData.records as video}
                <VideoCard {video} {isAdmin} />
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

    <Modal bind:showModal>
        {#snippet header()}
            <div class="mb-4 flex items-center justify-between">
                <h2 class="text-xl font-bold">添加视频</h2>
                <button
                    onclick={() => {
                        showModal = false
                    }}
                    class="text-gray-500 hover:text-gray-700">
                    ✕
                </button>
            </div>
        {/snippet}

        <div class="w-96 rounded-lg bg-white p-6">
            <div class="space-y-4">
                <div>
                    <label class="mb-2 block">
                        视频链接
                        <input
                            type="text"
                            bind:value={videoLink}
                            class="w-full rounded-md border p-2"
                            placeholder="请输入视频id或链接" />
                    </label>
                </div>

                <div class="flex justify-end space-x-2">
                    <button
                        class="rounded-md bg-gray-200 px-4 py-2 text-gray-700"
                        onclick={() => {
                            showModal = false
                        }}>
                        取消
                    </button>
                    <button
                        class="rounded-md bg-green-500 px-4 py-2 text-white"
                        onclick={handleAddVideo}>
                        确认
                    </button>
                </div>
            </div>
        </div>
    </Modal>
</div>
