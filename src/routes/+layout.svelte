<script lang="ts">
    import { Toaster } from "svelte-french-toast"
    import toast from "svelte-french-toast"
    import { page } from "$app/stores"
    import Navbar from "$lib/components/nav/Navbar.svelte"
    import "../app.css"

    let { children } = $props()

    let showFeedbackModal = $state(false)
    let feedbackText = $state("")

    let inputRef = $state<HTMLTextAreaElement | null>(null)

    async function submitFeedback() {
        await fetch("/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: feedbackText })
        })
        toast.success("反馈已提交")
        // showFeedbackModal = false
        feedbackText = ""
    }
</script>

<svelte:head>
    <title>Hololive 音乐视频排行榜 - 最新投稿播放量排行 | VTuber Music Hub</title>
    <meta
        name="description"
        content="探索 Hololive VTuber 最新音乐视频的播放量排行，实时更新投稿数据，让您不错过任何热门歌曲！" />
    <meta
        name="keywords"
        content="Hololive 音乐视频, Hololive 投稿排行, VTuber 歌曲排行榜, YouTube 音乐榜单, Startend" />
    <meta property="og:title" content="Hololive 音乐视频排行榜 - 最新投稿播放量排行" />
    <meta
        property="og:description"
        content="探索 Hololive VTuber 最新音乐视频的播放量排行，实时更新投稿数据，让您不错过任何热门歌曲！" />
    <!-- <meta property="og:image" content="/static/hololive-music-thumbnail.jpg" /> -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://startend.xyz" />
    <meta name="twitter:card" content="summary_large_image" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap&text=startend" />
</svelte:head>

<div class="min-h-screen bg-gray-100 dark:bg-gray-800">
    {#if $page.route.id !== "/login"}
        <Navbar />
    {/if}
    <!-- svelte-ignore a11y_hidden -->
    <h1
        aria-hidden="true"
        class="absolute -left-10 top-0 mb-6 text-center text-gray-800 dark:text-gray-200">
        Hololive 音乐视频排行榜
    </h1>

    <!-- 主要内容区域 -->
    <main class="mx-auto max-w-7xl px-4 py-6 pt-20">
        {@render children()}
    </main>
</div>
<!-- 用户反馈悬浮窗 -->
<div class="fixed bottom-4 right-4 z-50">
    <button
        aria-label="打开用户反馈窗口"
        class="rounded-full bg-blue-500 p-3 text-white shadow-lg transition-colors duration-300 hover:bg-blue-600"
        onclick={() => {
            showFeedbackModal = true
            setTimeout(() => {
                inputRef?.focus()
            }, 100)
        }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
        </svg>
    </button>
</div>
<!-- 用户反馈弹窗组件 -->
<div
    id="feedback-modal"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 {showFeedbackModal
        ? 'visible'
        : 'invisible'}">
    {#if showFeedbackModal}
        <div
            class="relative w-96 max-w-[90%] transform rounded-lg bg-white p-6 shadow-xl transition-all dark:bg-gray-700">
            <button
                aria-label="关闭用户反馈窗口"
                onclick={() => (showFeedbackModal = false)}
                class="absolute right-3 top-3 text-gray-500 hover:text-gray-800 dark:hover:text-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-white">用户反馈</h2>

            <form
                onsubmit={event => {
                    event.preventDefault()
                    submitFeedback()
                }}>
                <textarea
                    bind:this={inputRef}
                    bind:value={feedbackText}
                    placeholder="您的建议是我进步的动力..."
                    class="h-32 w-full rounded-md border p-2 dark:bg-gray-600 dark:text-white"
                    required></textarea>

                <div class="mt-4 flex justify-end space-x-2">
                    <button
                        type="button"
                        onclick={() => (showFeedbackModal = false)}
                        class="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-500 dark:text-white">
                        取消
                    </button>
                    <button
                        type="submit"
                        class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        提交
                    </button>
                </div>
            </form>
        </div>
    {/if}
</div>

<Toaster />
