import { writable, get } from 'svelte/store'
import { browser } from '$app/environment'


export interface Auth {
    token?: string
    expires?: number
}

const defaultAuth: Auth = { token: '', expires: 0 }

function createAuthStore() {
    const storedAuth = browser && localStorage.getItem('TOKEN')
        ? JSON.parse(localStorage.getItem('TOKEN') as string)
        : defaultAuth

    const { subscribe, set, update } = writable<Auth>(storedAuth)

    function persist(auth: Auth) {
        if (browser) localStorage.setItem('TOKEN', JSON.stringify(auth))
    }

    return {
        subscribe,
        login: (auth: Auth) => { set(auth); persist(auth) },
        logout: () => { set(defaultAuth); persist(defaultAuth) },
        refresh: (auth: Partial<Auth>) => {
            update(current => {
                const newAuth = { ...current, ...auth }
                persist(newAuth)
                return newAuth
            })
        },
        isTokenValid: () => {
            const current = get({ subscribe })
            return !!current.token && current.expires! > Date.now()
        }
    }
}

export const authStore = createAuthStore()