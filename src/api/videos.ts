import { get, post, put, del } from './api'

export const getVideos = (params?: { page?: number; limit?: number }) => {
  return get('/videos', params)
}

export const getVideoById = (id: number) => {
  return get(`/videos/${id}`)
}

export const createVideo = (data: { title: string; description: string; url: string }) => {
  return post('/videos', data)
}

export const updateVideo = (id: number, data: { title?: string; description?: string }) => {
  return put(`/videos/${id}`, data)
}

export const deleteVideo = (id: number) => {
  return del(`/videos/${id}`)
}

export const getUtbVideo = (videoId: string) => {
  return get(`/videos/utb/${videoId}`)
}
