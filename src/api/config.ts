import type { User } from "./auth"
import { api } from "./client"

export type Config = {
  localAddress: string
}

export const config = () => {
  return api.get<Config>("/api/config")
}

export type ApiConfig = {
  setup: boolean
}
export const apiConfig = () => {
  return api.get<ApiConfig>("/api")
}

export type SetupData = {
  username: string
  password: string
}
export const completeSetup = (data: SetupData) => {
  return api.post<{ user: User, token: string }>("/api/setup", data)
}