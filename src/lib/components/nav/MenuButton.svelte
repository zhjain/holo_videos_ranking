<script lang="ts">
    export let isMenuOpen: boolean
    export let toggleMenu: () => void
</script>

<button
    onclick={toggleMenu}
    class="text-gray-600 md:hidden dark:text-gray-300">
    <svg
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        {#if isMenuOpen}
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        {:else}
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        {/if}
    </svg>
</button> 