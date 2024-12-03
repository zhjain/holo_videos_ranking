<script lang="ts">
    import { fade, scale } from "svelte/transition"

    interface Props {
        showModal: boolean
        header?: () => any
        children?: () => any
        footer?: () => any
    }
    let { showModal = $bindable(), header, children, footer }: Props = $props()

    let dialog: HTMLDialogElement | undefined = $state()

    $effect(() => {
        if (showModal && dialog) dialog.showModal()
        else dialog?.close()
    })
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
{#if showModal}
    <div>
        <dialog
            bind:this={dialog}
            onclose={() => (showModal = false)}
            onclick={e => {
                if (e.target === dialog) dialog.close()
            }}>
            <div>
                {@render header?.()}
                <hr />
                {@render children?.()}
                <hr />
                {@render footer?.()}
            </div>
        </dialog>
    </div>
{/if}

<style>
    dialog {
        max-width: 32em;
        border-radius: 0.2em;
        border: none;
        padding: 0;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
</style>
