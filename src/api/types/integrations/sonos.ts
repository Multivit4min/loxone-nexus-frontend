import type { Integration } from "."

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