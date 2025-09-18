import { api } from "./client"

export type User = {
  id: number
  username: string
}

export const whoami = () => {
  return api.get<{ user: User }>("/api/auth/whoami")
}

export const login = (username: string, password: string) => {
  return api.post<{ user: User, token: string }>("/api/auth/login", { username, password })
}