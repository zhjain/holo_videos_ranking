<script lang="ts">
    import Navbar from "../components/nav/Navbar.svelte"
    import "../app.css"
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap&text=startend" />
</svelte:head>

<div class="min-h-screen bg-gray-100 dark:bg-gray-800">
    <Navbar />

    <!-- 主要内容区域 -->
    <main class="mx-auto max-w-7xl px-4 py-6 pt-20">
        <slot />
    </main>
</div>
