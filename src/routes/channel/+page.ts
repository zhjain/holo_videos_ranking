import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, url }) => {
    const page = url.searchParams.get('page') || 1

    const channelsPromise = fetch(`/api/channels?_page=${page}&_limit=10`).then(async response => {
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
        channels: channelsPromise
    }
}
