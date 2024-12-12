<script lang="ts">
    import { fade } from "svelte/transition"

    interface Props {
        showModal: boolean
        header?: () => any
        children?: () => any
        footer?: () => any
    }
    let { showModal = $bindable(), header, children, footer }: Props = $props()

    let isDragging = $state(false) // 是否正在拖动

    // 开始拖动
    const startDragging = () => {
        isDragging = true
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
    }

    // 处理鼠标移动
    const handleMouseMove = () => {
        isDragging = true
    }

    // 结束拖动
    const handleMouseUp = () => {
        isDragging = false
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
    }

    const closeModal = () => {
        if (!isDragging) {
            showModal = false
        }
    }

    function self(fn: any) {
        return function (...args: any[]) {
            var event = /** @type {Event} */ (args[0])
            // @ts-ignore
            if (event.target === this) {
                // @ts-ignore
                fn?.apply(this, args)
            }
        }
    }
</script>

{#if showModal}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
    <div
        role="dialog"
        aria-modal="true"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        transition:fade={{ duration: 200 }}
        onmousedown={self(closeModal)}>
        <div role="dialog"
            onmousedown={startDragging}
            class="relative w-full max-w-[32em] rounded-lg bg-white p-4 shadow-lg"
            transition:fade={{ duration: 200 }}>
            <div>
                {@render header?.()}
                <hr class="my-2" />
                {@render children?.()}
                <hr class="my-2" />
                {@render footer?.()}
            </div>
        </div>
    </div>
{/if}

<style>
    /* 移除原有的 dialog 样式，改用 Tailwind CSS 和内联样式 */
</style>
