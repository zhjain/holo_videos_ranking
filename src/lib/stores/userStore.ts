import { writable, get } from 'svelte/store'
import { browser } from '$app/environment'

export interface User {
    id?: string
    username?: string
    email?: string
    isAdmin?: boolean
    avatar?: string
    permissions?: string[]
}

const defaultUser: User = {}

function createUserStore() {
    const storedUser =
        browser && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user') as string)
            : defaultUser

    const { subscribe, set, update } = writable<User>(storedUser)

    function persist(user: User) {
        if (browser) localStorage.setItem('user', JSON.stringify(user))
    }

    return {
        subscribe,
        login: (userData: User) => { set(userData); persist(userData) },
        logout: () => { set(defaultUser); persist(defaultUser) },
        updateUser: (userData: Partial<User>) => {
            update(current => {
                const newUser = { ...current, ...userData }
                persist(newUser)
                return newUser
            })
        },
        hasPermission: (perm: string) => {
            const current = get({ subscribe })
            return Array.isArray(current.permissions) && current.permissions.includes(perm)
        }
    }
}

export const userStore = createUserStore()
