import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
    // 返回一个 Promise，用于异步加载视频数据
    const videosPromise = fetch('/api/videos?_page=1&_limit=10').then(async (response) => {
        const result = await response.json()
        return {
            records: result.data.records,
            hasMore: result.data.current * result.data.size < result.data.total,
            pagination: {
                current: result.data.current,
                size: result.data.size,
                total: result.data.total
            }
        }
    })

    return {
        videos: videosPromise
    }
}