<script lang="ts">
    import { page } from "$app/stores"
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

<div class="hidden items-center space-x-6 md:flex">
    {#each links as { href, label }}
        <a
            {href}
            class="transition-colors duration-200 {isActive(href)
                ? 'font-semibold text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}"
            aria-current={isActive(href) ? "page" : undefined}>
            {label}
        </a>
    {/each}
</div>
