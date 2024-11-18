import { writable } from 'svelte/store'

export interface User {
    id?: string
    username?: string
    email?: string
    is_admin?: boolean
    avatar?: string
}

function createUserStore() {
    const { subscribe, set, update } = writable<User>({})

    return {
        subscribe,
        login: (userData: User) => set(userData),
        logout: () => set({}),
        updateUser: (userData: Partial<User>) => update(currentUser => ({ ...currentUser, ...userData })),
        isAdmin: (state: User) => !!state.is_admin
    }
}

export const userStore = createUserStore() 