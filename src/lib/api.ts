import { get } from 'svelte/store'
import { authStore } from '$lib/stores/authStore'
import { userStore } from './stores/userStore';

let refreshTokenPromise: Promise<void> | null = null;

export async function customFetch<T>(
    url: string,
    options: RequestInit = {},
    needToken = false
): Promise<{ code: number; message: string; data: T }> {
    // 添加公共请求头，例如 Authorization
    // const token = authStore.subscribe(token => token)
    const auth = get(authStore)

    if (!authStore.isTokenValid()) {
        if (refreshTokenPromise === null) {
            refreshTokenPromise = refreshToken();
        }

        try {
            await refreshTokenPromise;
        } catch (error) {
            // 如果令牌刷新失败，且需要令牌，则抛出错误
            if (needToken) {
                authStore.logout()
                userStore.logout()
                throw new Error('Token验证失败，请重新登录');
            }
        } finally {
            refreshTokenPromise = null;
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


async function refreshToken(): Promise<void> {
    try {
        const response = await fetch('/api/auth/refresh', {
            method: 'GET'
        });
        const { code, data } = await response.json();

        if (code === 200) {
            authStore.login(data.token, 30 * 60);
        } else {
            throw new Error('令牌刷新失败');
        }
    } catch (error) {
        console.error('刷新令牌失败:', error);
        throw error;
    }
}