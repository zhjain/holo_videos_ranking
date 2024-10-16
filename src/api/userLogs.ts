import { get, post } from '@/utils/request/http'

export const getUserLogs = (userId: number) => {
  return get(`/user-logs/${userId}`)
}

export const createUserLog = (data: { userId: number; action: string; details?: string }) => {
  return post('/user-logs', data)
}

export const getUserLogsByDate = (userId: number, startDate: string, endDate: string) => {
  return get(`/user-logs/${userId}`, { params: { startDate, endDate } })
}
