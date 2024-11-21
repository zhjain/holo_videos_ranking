import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export interface User {
    id?: string
    username?: string
    email?: string
    isAdmin?: boolean
    avatar?: string
}

function createUserStore() {
    // 从 localStorage 中读取用户数据
    const storedUser =
        browser && localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user') as string)
            : {}

    const { subscribe, set, update } = writable<User>(storedUser)

    // 在数据变化时，将新的用户数据保存到 localStorage 中
    subscribe(currentUser => {
        if (browser) {
            localStorage.setItem('user', JSON.stringify(currentUser))
        }
    })

    return {
        subscribe,
        login: (userData: User) => set(userData),
        logout: () => set({}),
        updateUser: (userData: Partial<User>) =>
            update(currentUser => ({ ...currentUser, ...userData }))
    }
}

export const userStore = createUserStore()
