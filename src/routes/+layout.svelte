<script lang="ts">
    import { page } from "$app/stores"
    import Navbar from "$lib/components/nav/Navbar.svelte"
    import "../app.css"

    let { children } = $props()
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap&text=startend" />
</svelte:head>

<div class="min-h-screen bg-gray-100 dark:bg-gray-800">
    {#if $page.route.id !== "/login"}
        <Navbar />
    {/if}

    <!-- 主要内容区域 -->
    <main class="mx-auto max-w-7xl px-4 py-6 pt-20">
        {@render children()}
    </main>
</div>
