export function GET() {
    const content = `
  User-agent: *
  Disallow: /admin
  Disallow: /api
  Disallow: /*?page=*
  Allow: /
  Sitemap: https://yourwebsite.com/sitemap.xml
    `.trim()

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
}
