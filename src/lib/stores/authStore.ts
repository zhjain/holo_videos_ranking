import { writable } from 'svelte/store'
import { browser } from '$app/environment'


export interface Auth {
    token?: string
    expires?: number
}

function createAuthStore() {
    // 从 localStorage 中读取认证数据
    const storedAuth = browser && localStorage.getItem('TOKEN')
        ? JSON.parse(localStorage.getItem('TOKEN') as string)
        : { token: '', expires: 0 }

    const { subscribe, set, update } = writable<Auth>(storedAuth)

    // 在数据变化时，将新的认证数据保存到 localStorage 中
    subscribe((currentAuth) => {
        if (browser) {
            localStorage.setItem('TOKEN', JSON.stringify(currentAuth));
        }
    })

    return {
        subscribe,
        login: (token: string, expiresIn: number) => set({
            token,
            expires: Date.now() + expiresIn * 1000
        }),
        logout: () => set({ token: '', expires: 0 }),
        refresh: async (token: string, expiresIn: number) => update(() => ({
            token,
            expires: Date.now() + expiresIn * 1000
        })),
        isTokenValid: () => {
            const currentAuth = storedAuth;
            return currentAuth.token && currentAuth.expires > Date.now();
        }
    }
}

export const authStore = createAuthStore() 