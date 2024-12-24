<script lang="ts">
    import { page } from "$app/stores"
    import { fade, fly } from "svelte/transition"
    import { userStore } from "$lib/stores/userStore"
    import GoMarkGithub from "svelte-icons/go/GoMarkGithub.svelte"

    export let isMenuOpen: boolean

    const links = [
        { href: "/", label: "首页" },
        { href: "/video", label: "视频" },
        { href: "/channel", label: "频道" }
    ]

    $: isActive = (href: string) => {
        if (href === "/") {
            return $page.url.pathname === href
        }
        return $page.url.pathname.startsWith(href)
    }
</script>

{#if isMenuOpen}
    <div
        onclick={() => (isMenuOpen = false)}
        transition:fade={{ duration: 500 }}
        class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        aria-hidden="true"
    ></div>
    <div
        transition:fly={{ duration: 500, y: -80 }}
        class="fixed inset-x-0 top-[3.5rem] z-40 max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-white px-4 pb-6 pt-2 shadow-lg dark:bg-gray-900"
    >
        <!-- 导航链接 -->
        <div class="space-y-1">
            {#each links as { href, label }}
                <a
                    {href}
                    onclick={() => (isMenuOpen = false)}
                    class="block rounded-lg px-4 py-3 text-base font-medium transition-colors {isActive(
                        href
                    )
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'}"
                    aria-current={isActive(href) ? "page" : undefined}
                >
                    {label}
                </a>
            {/each}
        </div>

        <!-- 分隔线 -->
        <div class="hidden my-4 h-px bg-gray-200 dark:bg-gray-700" ></div>

        <!-- 用户信息和 GitHub 链接 -->
        <div class="hidden space-y-4 px-4">
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                    {$userStore.username?.[0]}
                </div>
                <div class="text-sm text-gray-700 dark:text-gray-300">
                    {$userStore.username}
                </div>
            </div>
            
            <a
                href="https://github.com/zhjain/holo_videos_ranking"
                target="_blank"
                class="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
                <div class="h-5 w-5">
                    <GoMarkGithub />
                </div>
                <span class="text-sm">GitHub</span>
            </a>
        </div>
    </div>
{/if} 