import type { ZodObject } from "@/components/zod/type"
import { api } from "./client"


export type LoxoneInstance = {
  id: number
  label: string
  host: string
  port: number
  listenPort: number
  active: boolean
  state: LoxoneInstanceState
  ownId: string
  remoteId: string
  variables: LoxoneVariable[]
  additionalInputs: LoxoneVariable[]
}

export type LoxoneVariable = {
  id: number
  label: string|null
  direction: VariableDirection
  packetId: string
  loxoneId: number
  type: VariableType
  value: any
  forced: boolean
  forcedValue: string|null
  suffix: string|null
  links?: VariableLink[]
}

export type VariableLink = {
  id: number
  loxoneVariableId: number
  integrationVariableId: number
}

export enum VariableDirection {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT"
}

export enum LoxoneInstanceState {
  INIT = 0,
  STOPPED = 1,
  STOPPING = 2,
  STARTING = 3,
  RUNNING = 4,
  ERROR = 5
}

export enum VariableType {
  DIGITAL = 0x00,
  ANALOG = 0x01,
  TEXT = 0x02,
  T5 = 0x03,
  SmartActuatorRGBW = 0x04,
  SmartActuatorSingleChannel = 0x05,
  SmartActuatorTunableWhite = 0x06
}

export type LoxoneResponse = {
  schema: ZodObject
  entries: LoxoneInstance[]
}

export const fetchAll = () => {
  return api.get<LoxoneResponse>("/api/loxone")
}

export type LoxoneConfig = {
  label: string
  host: string
  port: number
  listenPort: number
  remoteId: string
  ownId: string
}

export const addLoxone = (props: LoxoneConfig) => {
  return api.post("/api/loxone", props)
}

export const updateLoxone = (id: number, props: Partial<LoxoneConfig>) => {
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
  type: VariableType
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