<script lang="ts">
    import Headroom from "svelte-headroom"
    
    import NavLogo from "./NavLogo.svelte"
    import NavLinks from "./NavLinks.svelte"
    import NavUserSection from "./NavUserSection.svelte"
    import MobileMenu from "./MobileMenu.svelte"

    let isMenuOpen = false
    const toggleMenu = () => (isMenuOpen = !isMenuOpen)
</script>

<Headroom offset={100}>
    <nav class="fixed left-0 right-0 top-0 z-50 bg-white/80 shadow-sm backdrop-blur-md dark:bg-gray-900/80">
        <div class="mx-auto max-w-7xl px-4">
            <div class="flex h-14 items-center justify-between">
                <NavLogo />
                <NavLinks />
                <NavUserSection {isMenuOpen} {toggleMenu} />
            </div>
        </div>
    </nav>
</Headroom>

{#if isMenuOpen}
    <MobileMenu />
{/if} 