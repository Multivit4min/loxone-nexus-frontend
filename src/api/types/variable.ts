import type { IntegrationVariable } from "./integrations"
import type { LoxoneVariable } from "./loxone"

export type VariableTypes = IntegrationVariable|LoxoneVariable

export type VariableValueData = 
  NullVariable|
  BooleanVariable|
  StringVariable|
  NumberVariable|
  SmartActuatorSingleChannelVariable|
  SmartActuatorRGBWVariable

export type VariableValue = 
  NullVariableValue|
  BooleanVariableValue|
  StringVariableValue|
  NumberVariableValue|
  SmartActuatorSingleChannelValue

export enum VariableValueType {
  NULL = "null",
  BOOLEAN = "boolean",
  STRING = "string",
  NUMBER = "number",
  SMARTACTUATORSINGLECHANNEL = "SmartActuatorSingleChannel",
  SMARTACTUATORRGBW = "SmartActuatorRGBW"
}

export type NullVariableValue = null
export type NullVariable = {
  type: VariableValueType.NULL,
  value: NullVariableValue
}

export type BooleanVariableValue = boolean
export type BooleanVariable = {
  type: VariableValueType.BOOLEAN,
  value: BooleanVariableValue
}

export type StringVariableValue = string
export type StringVariable = {
  type: VariableValueType.STRING,
  value: StringVariableValue
}

export type NumberVariableValue = number
export type NumberVariable = {
  type: VariableValueType.NUMBER,
  value: NumberVariableValue
}


export type SmartActuatorSingleChannelValue = {
  //channel value usually 0-100 where 0 is off and 100 maximum illumination
  channel: number
  //time in seconds for transition
  fadeTime: number
}
export type SmartActuatorSingleChannelVariable = {
  type: VariableValueType.SMARTACTUATORSINGLECHANNEL,
  value: SmartActuatorSingleChannelValue
}


export type SmartActuatorRGBWValue = {
  red: number
  green: number
  blue: number
  white: number
  fadeTime: number
  bits: number
}
export type SmartActuatorRGBWVariable = {
  type: VariableValueType.SMARTACTUATORRGBW,
  value: SmartActuatorRGBWValue
}

export enum VariableDirection {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT"
}