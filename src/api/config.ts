import { api } from "./client"
import type { AuthUser } from "./types/user"

export type ConfigResponse = {
  localAddress: string
}

export const config = () => {
  return api.get<ConfigResponse>("/api/config")
}

export type ApiConfigResponse = {
  setup: boolean
}
export const apiConfig = () => {
  return api.get<ApiConfigResponse>("/api")
}

export type SetupDataProps = {
  username: string
  password: string
}
export const completeSetup = (data: SetupDataProps) => {
  return api.post<{ user: AuthUser, token: string }>("/api/setup", data)
}