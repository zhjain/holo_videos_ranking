import axios from './axios'

export const get = (url: string, params?: any) => {
  return axios.get(url, { params })
}

export const post = (url: string, data?: any) => {
  return axios.post(url, data)
}

export const put = (url: string, data?: any) => {
  return axios.put(url, data)
}

export const del = (url: string) => {
  return axios.delete(url)
}

// 可以根据需要添加更多方法
