import type { PageLoad } from './$types'
import { dev } from '$app/environment'


export type HistoricalData = {
    date: string
    video_view_count: number
    video_like_count: number
}

export type Video = {
    id: string
    video_id: string
    video_title: string
    video_type: string
    owner_channel_id: string
    owner_channel_title: string
    publish_time: string
    video_view_count: number
    video_custom_view_count: number
    video_like_count: number
    video_duration: string
    parsed_duration: number
    video_pic: string
    video_player: string
    video_player_proxy: string
    historial_data: HistoricalData[]
    updated_date: string
}

export type ApiResponse = {
    code: number
    message: string
    data: {
        current: number
        size: number
        next: number
        total: number
        records: Video[]
    }
}

export const ssr = !dev

export const load: PageLoad = async ({ fetch, url }) => {
    const page = url.searchParams.get('page') || "1"
    const limit = url.searchParams.get('limit') || '20'
    const type = url.searchParams.get('type') || 'all'
    const timeRange = url.searchParams.get('timeRange') || 'week'
    console.log('load rankings', page, limit, type, timeRange);

    const rankingsPromise = fetch(
        `/api/rankings/videos?_page=${page}&_limit=${limit}&_type=${type}&_timeRange=${timeRange}`
    ).then(async (response) => {
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
        rankings: rankingsPromise
    }
}