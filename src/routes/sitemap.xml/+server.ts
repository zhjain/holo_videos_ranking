export async function GET() {
    const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://startend.xyz</loc></url>
        <url><loc>https://startend.xyz/video</loc></url>
        <url><loc>https://startend.xyz/channel</loc></url>
      </urlset>
    `.trim()

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml'
        }
    })
}
