export function GET() {
    const content = `
User-agent: *
Disallow: /admin
Disallow: /api
Disallow: /*?page=*
Allow: /
Sitemap: https://startend.xyz/sitemap.xml
    `.trim()

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
}
