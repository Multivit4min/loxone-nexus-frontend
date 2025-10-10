import type { ZodConfig } from "@/components/zod/type"
import { api } from "./client"
import type { VariableDirection } from "./types/variable"
import type { Integration, Integrations } from "./types/integrations"

export type IntegrationConfigResponse = {
  commonSchema: ZodConfig
  integrations: IntegrationConfigEntry[]
}

export type IntegrationConfigEntry = {
  name: string
  icon: string
  config: ZodConfig
}

export type IntegrationCreate = {
  label: string
  name: string
  config: object
}

export type IntegrationUpdate = Omit<IntegrationCreate, "name">

export type GetIntegrationsResponse = {
  entries: Integrations
}

export const fetchAllIntegrations = () => {
  return api.get<GetIntegrationsResponse>("/api/integration")
}

export const createIntegration = (data: IntegrationCreate) => {
  return api.post<Integration>("/api/integration", data)
}

export const getConfig = () => {
  return api.get<IntegrationConfigResponse>("/api/integration/config")
} 

export const deleteIntegration = (id: number) => {
  return api.delete<IntegrationConfigResponse>(`/api/integration/${id}`)
}

export const updateIntegration = (id: number, data: Omit<IntegrationUpdate, "name">) => {
  return api.patch<IntegrationConfigResponse>(`/api/integration/${id}`, data)
}

export const getIntegrationTree = (id: number) => {
  return customIntegrationRoute(id, "/tree").get()
}

export type CreateIntegrationVariableProps<T extends Record<string, any>> = {
  label: string
  direction: VariableDirection
  props: T
}

export const createVariable = <T extends Record<string, any>>(id: number, props: CreateIntegrationVariableProps<T>) => {
  return api.post(`/api/integration/${id}/variable`, props)
}

export type UpdateIntegrationVariableProps<T extends Record<string, any>> = {
  label: string
  props: T
}

export const updateVariable = <T extends Record<string, any>>(id: number, variableId: number, props: UpdateIntegrationVariableProps<T>) => {
  return api.patch(`/api/integration/${id}/variable/${variableId}`, props)
}

export const deleteIntegrationVariable = (id: number, variableId: number) => {
  return api.delete(`/api/integration/${id}/variable/${variableId}`)
}

/**
 * calls the path /api/integration/:integrationId/custom/:path
 * @param integrationId 
 * @param path 
 * @returns 
 */
export const customIntegrationRoute = (integrationId: number, path: string) => {
  path = path.startsWith("/") ? path.slice(1) : path
  const basePath = `/api/integration/${integrationId}/custom/${path}`
  return {
    get: () => api.get(basePath),
    post: (data: any) => api.post(basePath, data),
    patch: (data: any) => api.patch(basePath, data),
    delete: () => api.delete(basePath),
  }
}