import { api } from "./client"
import type { AuthUser } from "./types/user"


export const whoami = () => {
  return api.get<{ user: AuthUser }>("/api/auth/whoami")
}

export const login = (username: string, password: string) => {
  return api.post<{ user: AuthUser, token: string }>("/api/auth/login", { username, password })
}