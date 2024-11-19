<script lang="ts">
    import GoMarkGithub from "svelte-icons/go/GoMarkGithub.svelte"
    import MenuButton from "./MenuButton.svelte"

    let { isMenuOpen, toggleMenu } = $props()
</script>

<div class="flex items-center space-x-4">
    <MenuButton {isMenuOpen} {toggleMenu} />

    <!-- 用户头像和GitHub链接 - 桌面端 -->
    <div class="hidden items-center space-x-4 md:flex">
        <div
            class="hidden h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
            U
        </div>
        <a
            href="https://github.com"
            target="_blank"
            aria-label="github"
            class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
            <div class="h-6 w-6">
                <GoMarkGithub />
            </div>
        </a>
    </div>
</div>
