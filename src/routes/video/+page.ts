import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
    const response = await fetch('/api/videos?_page=1&_limit=10')
    const result = await response.json()

    return {
        videos: result.data.records,
        hasMore: result.data.current * result.data.size < result.data.total,
        pagination: {
            current: result.data.current,
            size: result.data.size,
            total: result.data.total
        }
    }
}