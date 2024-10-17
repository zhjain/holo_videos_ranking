declare interface Video {
  id: string
  video_id: string
  video_title: string
  video_pic: string
  video_view_count: number
  video_like_count: number
  video_duration: string
  publish_time: string
  owner_channel_title: string
}

declare interface VideoState {
  videos: Video[]
  loading: boolean
  error: string | null
  pagination: PaginationInfo
}
