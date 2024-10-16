import { post } from './api'

export const login = (data: { username: string; password: string }) => {
  return post('/auth/login', data)
}

export const logout = () => {
  return post('/auth/logout')
}

export const register = (data: { username: string; password: string; email: string }) => {
  return post('/auth/register', data)
}

export const getUserInfo = () => {
  return post('/auth/user-info')
}
