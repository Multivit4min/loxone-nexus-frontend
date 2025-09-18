export const DEFAULT = {
  icon: "mdi-help",
  label: "Unknown"
}

export type IntegrationMeta = typeof DEFAULT

export const integrationMeta: Record<string, IntegrationMeta> = {
  DEFAULT,
  HomeAssistant: {
    icon: "mdi-home-assistant",
    label: "HomeAssistant"
  },
  Sonos: {
    icon: "mdi-cast-audio",
    label: "Sonos"
  }
}

export function meta(id: string): IntegrationMeta {
  const meta = integrationMeta[id]
  if (!meta) return integrationMeta.DEFAULT
  return meta
}