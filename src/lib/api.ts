import { get } from 'svelte/store'
import { authStore } from '$lib/stores/authStore'

export async function customFetch<T>(
    url: string,
    options: RequestInit = {},
    needToken = false
): Promise<{ code: number; message: string; data: T }> {
    // 添加公共请求头，例如 Authorization
    // const token = authStore.subscribe(token => token)
    const auth = get(authStore)

    if (!authStore.isTokenValid()) {
        if (needToken) {
            const response = await fetch('/api/auth/refresh', {
                method: 'GET'
            })
            const { code, data, message } = await response.json()
            if (code === 200) {
                authStore.login(data.token, 30 * 60)
            }
        } else {
            fetch('/api/auth/refresh', {
                method: 'GET'
            })
                .then(async response => {
                    const { code, data, message } = await response.json()
                    if (code === 200) {
                        authStore.login(data.token, 30 * 60)
                    }
                })
                .catch(error => {
                    console.error('刷新令牌失败:', error)
                })
        }
    }
    const headers: HeadersInit = {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
        ...options.headers
    }

    const response = await fetch(url, {
        ...options,
        headers
    })
    const data = await response.json()

    return data
}
