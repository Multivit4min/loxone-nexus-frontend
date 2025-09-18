import type { ZodConfig } from "@/components/zod/type"
import { api } from "./client"
import type { VariableDirection, VariableLink } from "./loxone"

export type IntegrationConfig = {
  commonSchema: ZodConfig
  integrations: IntegrationConfigEntry[]
}

export type IntegrationConfigEntry = {
  name: string
  icon: string
  config: ZodConfig
}

export type HomeAssistantIntegration = Integration<null>


export type SonosZone = {
  SerialNumber: string
  SoftwareVersion: string
  DisplaySoftwareVersion: number
  HardwareVersion: string
  IPAddress: string
  MACAddress: string
  CopyrightInfo: string
  HTAudioIn: number
  Flags: number
}
export type SonosState = {
  mediaInfo: {
    NrTracks: number,
    MediaDuration: "NOT_IMPLEMENTED",
    PlayMedium: string,
    RecordMedium: "NOT_IMPLEMENTED",
    WriteStatus: "NOT_IMPLEMENTED"
  },
  muted: false,
  positionInfo: {
    Track: 0,
    TrackDuration: string,
    RelTime: string,
    AbsTime: "NOT_IMPLEMENTED",
    RelCount: number,
    AbsCount: number
  },
  transportState: string,
  volume: number
}
export type SonosIntegration = Integration<{
  zone?: SonosZone
  state?: SonosState
}>

export type Integrations = Integration[]
export type Integration<T = any> = {
  id: number
  label: string
  type: string
  version: number
  config: Record<string, any>
  variables: IntegrationVariables
  specific: T
  configSchema: ZodConfig
  outputVariableSchema: ZodConfig
  inputVariableSchema: ZodConfig
  actions: IntegrationActions
}

export type IntegrationActions = IntegrationAction[]
export type IntegrationAction = {
  id: string
  description: string
  schema: ZodConfig
}

export type IntegrationVariables = IntegrationVariable[]

export type IntegrationVariable<T = any> = {
  id: number
  integrationId: number
  label: string
  direction: "INPUT"|"OUTPUT"
  value: string|null
  config: T
  links?: VariableLink[]
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
  return api.get<IntegrationConfig>("/api/integration/config")
} 

export const deleteIntegration = (id: number) => {
  return api.delete<IntegrationConfig>(`/api/integration/${id}`)
}

export const updateIntegration = (id: number, data: Omit<IntegrationUpdate, "name">) => {
  return api.patch<IntegrationConfig>(`/api/integration/${id}`, data)
}

export const getInternalVariables = <T>(id: number) => {
  return api.get<T>(`/api/integration/${id}/internalVariables`)
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

export const updateVariable = <T extends Record<string, any>>(id: number, variableId: string, props: UpdateIntegrationVariableProps<T>) => {
  return api.patch(`/api/integration/${id}/variable/${variableId}`, props)
}

export const deleteIntegrationVariable = (id: number, variableId: number) => {
  return api.delete(`/api/integration/${id}/variable/${variableId}`)
}