import type { Handle } from '@sveltejs/kit'
import { API_BASE_URL, GA_ID } from '$lib/config'
import { dev } from '$app/environment';

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

    // 非 API 请求正常处理，并添加GA代码
    const response = await resolve(event);
    if (!dev && GA_ID) {
        const page = event.url.pathname + event.url.search;
        const html = await response.text();
        const newHtml = html.replace(
            `<head>`,
            `<head>
              <!-- Google tag (gtag.js) -->
              <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
              <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_ID}', { 'page_path': '${page}' });
              </script>
            `
        );
        response.headers.set('Content-Length', new TextEncoder().encode(newHtml).length.toString())
        return new Response(newHtml, response)
    }

    return response;
} 