import type { Handle } from '@sveltejs/kit'
import { API_BASE_URL } from '$lib/config'

export const handle: Handle = async ({ event, resolve }) => {
    // 处理 API 请求
    if (event.url.pathname.startsWith('/api')) {
        const targetUrl = new URL(
            event.url.pathname + event.url.search,
            API_BASE_URL
        )

        try {
            const response = await fetch(targetUrl, {
                method: event.request.method,
                headers: event.request.headers,
                body: event.request.method !== 'GET' ? await event.request.blob() : undefined
            })

            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            })
        } catch (error) {
            console.error('Proxy error:', error)
            return new Response('Proxy Error', { status: 500 })
        }
    }

    // 非 API 请求正常处理
    return await resolve(event)
} 