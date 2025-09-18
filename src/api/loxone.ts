import type { ZodObject } from "@/components/zod/type"
import { api } from "./client"
import type { VariableDirection } from "./types/variable"
import type { LoxoneInstance, LoxoneVariableType } from "./types/loxone"


export type LoxoneResponse = {
  schema: ZodObject
  entries: LoxoneInstance[]
}

export const fetchAll = () => {
  return api.get<LoxoneResponse>("/api/loxone")
}

export type LoxoneConfigProps = {
  label: string
  host: string
  port: number
  listenPort: number
  remoteId: string
  ownId: string
}

export const addLoxone = (props: LoxoneConfigProps) => {
  return api.post("/api/loxone", props)
}

export const updateLoxone = (id: number, props: Partial<LoxoneConfigProps>) => {
  return api.patch(`/api/loxone/${id}`, props)
}

export const deleteInstance = (instanceId: number) => {
  return api.delete(`/api/loxone/${instanceId}`)
}

export const startLoxone = (instanceId: number) => {
  return api.patch(`/api/loxone/${instanceId}/start`)
}

export const stopLoxone = (instanceId: number) => {
  return api.patch(`/api/loxone/${instanceId}/stop`)
}

export type CreateVariableProps = {
  packetId: string
  label?: string
  direction: VariableDirection
  type: LoxoneVariableType
  suffix?: string
  description?: string
}

export const createVariable = (instanceId: number, props: CreateVariableProps) => {
  return api.post(`/api/loxone/${instanceId}/variables`, props)
}

export const deleteVariable = (instanceId: number, variableId: number) => {
  return api.delete(`/api/loxone/${instanceId}/variables/${variableId}`)
}

export type UpdateVariableProps = {
  instanceId: number
  variableId: number
  label?: string|null
  suffix?: string|null
  description?: string|null
}
export const updateVariable = ({ instanceId, variableId, ...props }: UpdateVariableProps) => {
  return api.patch(`/api/loxone/${instanceId}/variables/${variableId}`, props)
}

export type ForceVariableProps = {
  instanceId: number
  variableId: number
  value: any
}
export const forceVariable = ({ instanceId, variableId, value }: ForceVariableProps) => {
  return api.patch(`/api/loxone/${instanceId}/variables/${variableId}/force`, { value })
}

export const unforceVariable = (instanceId: number, variableId: number) => {
  return api.delete(`/api/loxone/${instanceId}/variables/${variableId}/force`)
}