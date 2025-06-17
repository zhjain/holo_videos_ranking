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

    if (!authStore.isTokenValid()) {
        if (refreshTokenPromise === null) {
            refreshTokenPromise = refreshToken();
        }

        if (needToken) {
            try {
                await refreshTokenPromise;
            } catch (error) {
                authStore.logout()
                userStore.logout()
                throw new Error('Token验证失败，请重新登录');
            } finally {
                refreshTokenPromise = null;
            }
        }
    }
    // TODO 这里有问题, 如果token不存在的话会传`Bearer `, 应该改成不传Authorization
    let headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers
    }
    if (get(authStore).token) {
        headers = { ...headers, Authorization: `Bearer ${get(authStore).token}` }
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
            authStore.refresh(data.token, 1 * 60);
        } else {
            throw new Error('令牌刷新失败');
        }
    } catch (error) {
        console.error('刷新令牌失败:', error);
        throw error;
    }
}