import { defineStore } from "pinia"
import {
  fetchAllIntegrations,
  getConfig,
  type IntegrationConfigResponse
} from "@/api/integration"
import type { Integration, Integrations, IntegrationVariable } from "@/api/types/integrations"
import { VariableDirection } from "@/api/types/variable"
import type { VariableLink } from "@/api/types/link"

export type IntegrationLinkList = IntegrationLinkEntry[]
export type IntegrationLinkEntry = {
  integration: Integration,
  variable: IntegrationVariable
}

export type IntegrationVariableById = IntegrationVariable & { integration: Integration }

export const useIntegrationStore = defineStore("integration", {
  state: () => ({
    initialized: false,
    integrations: [] as Integrations,
    config: { commonSchema: null as any, integrations: [] } as IntegrationConfigResponse
  }),
  getters: {
    getLinks: (store) => {
      return (ids: number[]): IntegrationLinkList => {
        const links: IntegrationLinkList = []
        store.integrations.forEach(integration => {
          integration.variables.forEach(variable => {
            if (!ids.includes(variable.id)) return
            links.push({ integration, variable })
          })
        })
        return links
      }
    },
    getVariableById(state) {
      return (id: number) => {
        let variable: IntegrationVariableById|undefined
        state.integrations.some(integration => {
          integration.variables.some(v => v.id === id ? (variable = { ...v, integration }, true) : false)
        })
        return variable
      }
    },
    getVariablesByLinks(state) {
      return (links: VariableLink[]) => {
        const variables = this.getVariablesById(links.map(link => link.integrationVariableId))
        return links.map(link => ({
          ...link,
          integrationVariable: variables.find(v => v.id === link.integrationVariableId)
        }))
      }
    },
    getVariableLinks: (state) => {
      return (direction: VariableDirection) => {
        const list: IntegrationVariable[] = []
        state.integrations.forEach(i => i.variables.forEach(v => {
          if (v.direction !== direction) return
          if (v.direction === VariableDirection.OUTPUT && v.links && v.links.length > 0) return
          return list.push(v)
        }))
        return list
      }
    },
    getVariablesById(state) {
      return (ids: number[]) => {
        const vars: IntegrationVariableById[] = []
        state.integrations.forEach(integration => {
          integration.variables.forEach(v => {
            if (ids.includes(v.id)) vars.push({ ...v, integration })
          })
        })
        return vars
      }
    },
    getIntegrationById(state) {
      return (id: number) => {
        const integration = this.integrations.find(i => i.id === id)
        if (!integration) throw new Error(`could not find integration with id ${id}`)
        return integration
      }
    }
  },
  actions: {
    async initialize() {
      await Promise.all([
        this.getAll(),
        this.getConfig()
      ])
      this.initialized = true
    },
    async getAll() {
      const { entries } = await fetchAllIntegrations()
      this.integrations = entries
      return this.integrations
    },
    setIntegrations(integrations: any[]) {
      this.integrations = integrations
      return this.integrations
    },
    setIntegration(integration: Integration) {
      const index = this.integrations.findIndex(i => i.id === integration.id)
      if (index < 0) {
        this.integrations.push(integration)
      } else {
        this.integrations[index] = integration
      }
      return this.integrations
    },
    setIntegrationVariable(variable: IntegrationVariable) {
      const integration = this.integrations.find(i => i.id === variable.integrationId)
      if (!integration) return
      const index = integration.variables.findIndex(v => v.id === variable.id)
      if (index < 0) return
      integration.variables[index] = variable
    },
    async getConfig() {
      if (this.config.commonSchema) return this.config
      this.config = await getConfig()
      return this.config
    }
  }
})