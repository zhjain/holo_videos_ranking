<script lang="ts">
    const links = [
        { href: "/", label: "首页" },
        { href: "/video", label: "视频" },
        { href: "/channel", label: "频道" }
    ]
</script>

<div class="fixed inset-0 z-40 bg-white md:hidden dark:bg-gray-900">
    <div class="space-y-4 px-4 pt-20">
        {#each links as { href, label }}
            <a
                {href}
                class="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                {label}
            </a>
        {/each}
    </div>
</div> 