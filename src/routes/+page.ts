import type { PageLoad } from './$types'
import { dev } from '$app/environment'
import { customFetch } from '$lib/api'


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

export const load: PageLoad = async ({ fetch }) => {
    const isSSR = import.meta.env.SSR; // 检测是否服务端渲染
    console.log('isSSR', isSSR)
    if (!isSSR) {
        return {
            records: [],
            hasMore: false,
            pagination: {
                current: 1,
                size: 20,
                total: 0
            }
        }
    }
    const response = await customFetch(
        `/api/rankings/videos?_page=1&_limit=20&_type=all&_timeRange=all`
    )
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
}