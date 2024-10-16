import { get, post, put, del } from './api'

export const getChannels = () => {
  return get('/channels')
}

export const getChannelById = (id: number) => {
  return get(`/channels/${id}`)
}

export const createChannel = (data: { name: string; description: string }) => {
  return post('/channels', data)
}

export const updateChannel = (id: number, data: { name?: string; description?: string }) => {
  return put(`/channels/${id}`, data)
}

export const deleteChannel = (id: number) => {
  return del(`/channels/${id}`)
}
