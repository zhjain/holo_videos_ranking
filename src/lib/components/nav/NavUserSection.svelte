<script lang="ts">
    import GoMarkGithub from "svelte-icons/go/GoMarkGithub.svelte"

    import { userStore } from "$lib/stores/userStore"
    import { authStore } from "$lib/stores/authStore"
    import { get } from 'svelte/store'

    import MenuButton from "./MenuButton.svelte"

    let { isMenuOpen, toggleMenu } = $props()

    let showUserMenu = $state(false)

    function handleLogout() {
        authStore.logout()
    }

    let isAuthenticated = $derived(authStore.isTokenValid())
</script>

<div class="flex items-center space-x-4">
    <MenuButton {isMenuOpen} {toggleMenu} />

    {#if isAuthenticated}
        <!-- 用户头像和GitHub链接 - 桌面端 -->
        <div class="relative hidden items-center space-x-4 md:flex">
            <button
                class="h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-bold text-white"
                onclick={() => (showUserMenu = !showUserMenu)}>
                {$userStore.username?.[0]}
            </button>

            {#if showUserMenu}
                <div
                    class="absolute right-0 top-full mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-700">
                    <div
                        class="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu">
                        <a
                            href="/profile"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                            role="menuitem"
                            >个人信息</a
                        >
                        <button
                            onclick={handleLogout}
                            class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                            role="menuitem"
                            >退出</button
                        >
                    </div>
                </div>
            {/if}

            <a
                href="https://github.com/zhjain/holo_videos_ranking"
                target="_blank"
                aria-label="github"
                class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                <div class="h-6 w-6">
                    <GoMarkGithub />
                </div>
            </a>
        </div>
    {/if}
</div>
