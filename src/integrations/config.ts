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
  },
  Calendar: {
    icon: "mdi-calendar-month",
    label: "Calendar"
  },
  Hue: {
    icon: "mdi-lightbulb-multiple",
    label: "Hue"
  }
}

export function meta(id: string): IntegrationMeta {
  const meta = integrationMeta[id]
  if (!meta) return integrationMeta.DEFAULT
  return meta
}