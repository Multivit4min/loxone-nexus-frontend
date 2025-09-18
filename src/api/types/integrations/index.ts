import type { ZodConfig } from "@/components/zod/type"
import type { VariableLink } from "../link"


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

export type IntegrationActions = IntegrationAction[]
export type IntegrationAction = {
  id: string
  description: string
  schema: ZodConfig
}