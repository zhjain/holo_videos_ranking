import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, params }) => {
    const { id } = params

    const channelDetailPromise = fetch(`/api/channels/${id}`).then(async response => {
        if (!response.ok) {
            console.error('Failed to fetch channel details')
        }
        return await response.json()
    })

    return {
        channel: channelDetailPromise
    }
} 