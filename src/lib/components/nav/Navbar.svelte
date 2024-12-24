<script lang="ts">
    import Headroom from "svelte-headroom"

    import NavLogo from "./NavLogo.svelte"
    import NavLinks from "./NavLinks.svelte"
    import NavUserSection from "./NavUserSection.svelte"
    import MobileMenu from "./MobileMenu.svelte"

    let isMenuOpen = false
    const toggleMenu = () => (isMenuOpen = !isMenuOpen)
    const handleUnpin = () => {
        isMenuOpen = false
    }
</script>

<nav class="fixed top-0 z-50">
    <Headroom offset={100} on:unpin={handleUnpin}>
        <div class="bg-white/80 shadow-sm backdrop-blur-md dark:bg-gray-900/80">
            <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
                <NavLogo />
                <NavLinks />
                <NavUserSection {isMenuOpen} {toggleMenu} />
            </div>
        </div>
    </Headroom>
</nav>

<!-- {#if isMenuOpen} -->
<MobileMenu bind:isMenuOpen />
<!-- {/if} -->
