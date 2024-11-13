/// <reference types="@sveltejs/kit" />

declare module 'svelte-headroom';

declare module 'svelte-icons/go/GoMarkGithub.svelte' {
    import type { SvelteComponent } from 'svelte';
    export default class GoMarkGithub extends SvelteComponent<{
        size?: string | number;
        color?: string;
    }> { }
}

declare module 'svelte-icons/*' {
    import type { SvelteComponent } from 'svelte';
    export default class Icon extends SvelteComponent<{
        size?: string | number;
        color?: string;
    }> { }
}
