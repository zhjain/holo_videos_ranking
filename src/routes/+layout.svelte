<script lang="ts">
    import { page } from "$app/stores"
    import Navbar from "$lib/components/nav/Navbar.svelte"
    import "../app.css"

    let { children } = $props()
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
    <h1 aria-hidden="true" class="absolute left-0 top-0 mb-6 text-center text-gray-800 dark:text-gray-200">
        Hololive 音乐视频排行榜
    </h1>

    <!-- 主要内容区域 -->
    <main class="mx-auto max-w-7xl px-4 py-6 pt-20">
        {@render children()}
    </main>
</div>
