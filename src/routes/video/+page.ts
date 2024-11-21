import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, url }) => {
    const page = url.searchParams.get('page') || 1
    const type = url.searchParams.get('type') || ''

    // 返回一个 Promise，用于异步加载视频数据
    const videosPromise = fetch(`/api/videos?_page=${page}&_limit=10&_type=${type}`).then(async response => {
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
