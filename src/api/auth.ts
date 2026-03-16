import client from "./client"

export const register = (nickname: string, email: string, password: string) =>
  client.post<{ access_token: string; user_id: string; nickname: string }>(
    '/auth/register', { nickname, email, password }
  )

export const login = (login: string, password: string) =>
  client.post<{ access_token: string; user_id: string; nickname: string }>(
    '/auth/login', { login, password }
  )

export const getMe = () =>
    client.get('/auth/me')