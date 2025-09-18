import type { VariableDirection, VariableValueData } from "./variable"
import type { VariableLink } from "./link"

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
  type: LoxoneVariableType
  value: VariableValueData
  forced: boolean
  forcedValue: string|null
  suffix: string|null
  links?: VariableLink[]
}

export enum LoxoneInstanceState {
  INIT = 0,
  STOPPED = 1,
  STOPPING = 2,
  STARTING = 3,
  RUNNING = 4,
  ERROR = 5
}

export enum LoxoneVariableType {
  DIGITAL = 0x00,
  ANALOG = 0x01,
  TEXT = 0x02,
  T5 = 0x03,
  SmartActuatorRGBW = 0x04,
  SmartActuatorSingleChannel = 0x05,
  SmartActuatorTunableWhite = 0x06
}