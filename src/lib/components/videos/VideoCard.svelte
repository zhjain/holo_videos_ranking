<script lang="ts">
    import { writable } from "svelte/store"
    import FaTrashAlt from "svelte-icons/fa/FaTrashAlt.svelte"
    import toast from "svelte-french-toast"
    import { customFetch } from "$lib/api"

    // 添加 clickoutside 动作
    function clickoutside(node: HTMLElement, callback: () => void) {
        const handleClick = (event: MouseEvent) => {
            if (!node.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener("click", handleClick, true)

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true)
            }
        }
    }

    let { video, isAdmin } = $props()

    let videoType = $state(video.video_type)
    const videoTypes = [
        { value: "origin", label: "原创歌曲" },
        { value: "cover", label: "翻唱歌曲" },
        { value: "live", label: "直播片段" }
    ]

    const dropdownOpen = writable(false)

    function formatViewCount(count: number): string {
        if (count >= 100000000) {
            return `${(count / 100000000).toFixed(1)}亿`
        } else if (count >= 10000) {
            return `${(count / 10000).toFixed(1)}万`
        }
        return count.toString()
    }

    function formatDuration(duration: number): string {
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString)
        return date.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }

    const videoTypeText = $derived.by(() => {
        const typeMap: { [key: string]: string } = {
            origin: "原创",
            cover: "翻唱",
            live: "直播",
            deleted: "已删除",
            unset: "未分类"
        }
        return typeMap[videoType] || typeMap["unset"]
    })

    async function onVideoTypeChange(videoId: string, type: string) {
        console.log("onVideoTypeChange", videoId, type)
        try {
            const { code, message } = await customFetch(
                `/api/videos/${videoId}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        video_type: type
                    })
                },
                true
            )
            if (code === 200) {
                return true
            } else if (code === 401) {
                // 处理 token 验证失败的情况
                toast.error("Token验证失败，请重新登录")
                return false
            } else {
                toast.error(`请求失败：${message}`)
                return false
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("网络请求错误")
            }
            return false
        }
    }

    async function handleVideoTypeChange(type: string) {
        const success = await onVideoTypeChange(video.id, type)
        if (success) {
            videoType = type
            toast.success("视频类型已更新")
        }
        dropdownOpen.set(false)
    }

    async function handleVideoDelete() {
        const success = await onVideoTypeChange(video.id, "deleted")
        if (success) {
            videoType = "deleted"
            toast.success("视频已删除")
        }
    }

    function toggleDropdown() {
        dropdownOpen.update(open => !open)
    }

    function closeDropdown() {
        dropdownOpen.set(false)
    }
</script>

<div class="relative z-0 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
    <!-- 右上角操作区域 -->
    <div class="absolute right-2 top-2 z-10 flex items-center space-x-2">
        {#if isAdmin}
            <!-- 视频类型选择 -->
            <div class="relative" use:clickoutside={closeDropdown}>
                <button
                    onclick={toggleDropdown}
                    class="rounded bg-gray-100 px-2 py-1 text-xs
                           hover:bg-gray-200 dark:bg-gray-700
                           dark:text-gray-300 dark:hover:bg-gray-600">
                    {videoTypeText}
                </button>

                {#if $dropdownOpen}
                    <ul
                        class="absolute right-0 mt-1 w-auto min-w-[80px] rounded-md
                               border border-gray-200 bg-white shadow-lg
                               dark:border-gray-600 dark:bg-gray-700">
                        {#each videoTypes as type}
                            <li>
                                <button
                                    onclick={() => handleVideoTypeChange(type.value)}
                                    class="w-full px-3 py-2 text-center text-xs
                                           hover:bg-gray-100 dark:hover:bg-gray-600
                                           {videoType === type.value
                                        ? 'bg-gray-100 dark:bg-gray-600'
                                        : ''}">
                                    {type.label}
                                </button>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <!-- 删除按钮 -->
            <button
                onclick={handleVideoDelete}
                class="h-5 w-5 text-gray-500 hover:text-red-600"
                aria-label="删除视频">
                <FaTrashAlt />
            </button>
        {:else}
            <!-- 非管理员只显示视频类型 -->
            <span
                class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500
                       dark:bg-gray-700 dark:text-gray-400">
                {videoTypeText}
            </span>
        {/if}
    </div>

    <div class="flex flex-col md:flex-row">
        <!-- 左侧视频缩略图 -->
        <div class="relative md:h-44 md:w-80">
            <div class="aspect-video">
                <img
                    src={video.video_cdn_pic}
                    alt={video.video_title}
                    class="h-full w-full object-cover" />
                <div class="absolute bottom-2 right-2 rounded bg-black/80 px-1 text-xs text-white">
                    {formatDuration(video.parsed_duration)}
                </div>
            </div>
        </div>

        <!-- 右侧视频信息 -->
        <div class="flex flex-1 flex-col p-4">
            <h3
                class="mb-2 text-xl font-semibold text-gray-900 dark:text-white
                {isAdmin ? 'mr-16' : 'mr-10'}">
                {video.video_title}
            </h3>

            <div class="mb-4 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="text-sm text-gray-700 dark:text-gray-300">
                    {video.owner_channel_title}
                </span>
                <div class="flex items-center space-x-2">
                    <span>{formatViewCount(video.video_view_count)}次观看</span>
                    <span>•</span>
                    <span>发布于 {formatDate(video.publish_time)}</span>
                </div>
            </div>

            <div class="flex items-center space-x-2"></div>
        </div>
    </div>
</div>
