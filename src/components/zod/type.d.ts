export type ZodConfig = {
  $schema: string
  required: string[]
  additionalProperties: boolean
} & (ZodDataType | ZodAnyOf)

export type ZodDataType = ZodAnyOfDataType|ZodAnyOf
export type ZodAnyOfDataType = ZodObject|ZodString|ZodNumber

export type ZodAnyOf = {
  description?: string
  default?: any
  anyOf: ZodAnyOfDataType[]
}

export type ZodObject = {
  type: "object"
  description?: string
  properties: Record<string, ZodDataType>
  additionalProperties: boolean
  required?: string[]
}

export type ZodString = {
  type: "string"
  default?: string
  enum?: string[]
  format?: "uri"|"ipv4"|"ipv6"|"hostname"
  pattern?: string
  description?: string
  const?: string
  minLength?: number
  maxLength?: number
}

export type ZodNumber = {
  type: "number"|"integer"
  default?: number
  description?: string
  minimum?: number
  maximum?: number
}