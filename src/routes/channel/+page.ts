import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
    const channelsPromise = fetch('/api/channels?_page=1&_limit=20').then(async (response) => {
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
