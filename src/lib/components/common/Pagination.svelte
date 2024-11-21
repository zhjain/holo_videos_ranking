<script lang="ts">
    import { goto } from "$app/navigation"

    interface Props {
        current: number
        total: number
        size: number
        basePath?: string
    }

    let { current, total, size, basePath = "/video" } = $props()

    const totalPages = $derived(Math.ceil(total / size))

    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) {
            goto(`${basePath}?page=${page}`)
        }
    }
</script>

<div class="mt-6 flex items-center justify-center space-x-4">
    <button
        disabled={current <= 1}
        onclick={() => goToPage(current - 1)}
        class="rounded bg-gray-200 px-4 py-2 disabled:opacity-50">
        上一页
    </button>

    <span class="text-gray-700">
        第 {current} 页 / 共 {totalPages} 页
    </span>

    <button
        disabled={current >= totalPages}
        onclick={() => goToPage(current + 1)}
        class="rounded bg-gray-200 px-4 py-2 disabled:opacity-50">
        下一页
    </button>
</div>
