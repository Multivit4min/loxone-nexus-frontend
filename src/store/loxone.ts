import { defineStore } from "pinia"
import { fetchAll } from "@/api/loxone"
import type { ZodObject } from "@/components/zod/type"
import type { LoxoneInstance, LoxoneVariable } from "@/api/types/loxone"
import type { VariableLink } from "@/api/types/link"
import { VariableDirection } from "@/api/types/variable"

export type LoxoneLinkList = LoxoneLinkEntry[]
export type LoxoneLinkEntry = {
  instance: LoxoneInstance,
  variable: LoxoneVariable
}

export type LoxoneVariableById = LoxoneVariable & { instance: LoxoneInstance }

export const useLoxoneStore = defineStore("loxone", {
  state: () => ({
    instanceSchema: undefined as ZodObject|undefined, 
    instances: [] as LoxoneInstance[],
    initialized: false
  }),
  getters: {
    getLinks: (store) => {
      return (ids: number[]): LoxoneLinkList => {
        const links: LoxoneLinkList = []
        store.instances.forEach(instance => {
          instance.variables.forEach(variable => {
            if (!ids.includes(variable.id)) return
            links.push({ instance, variable })
          })
        })
        return links
      }
    },
    getVariablesByLinks(state) {
      return (links: VariableLink[]) => {
        const variables = this.getVariablesById(links.map(link => link.loxoneVariableId))
        return links.map(link => ({
          ...link,
          loxoneVariable: variables.find(v => v.id === link.loxoneVariableId)
        }))
      }
    },
    getVariableById(state) {
      return (id: number) => {
        let variable: LoxoneVariableById|undefined
        state.instances.some(instance => {
          instance.variables.some(v => v.id === id ? (variable = { ...v, instance }, true) : false)
        })
        return variable
      }
    },
    getVariablesById(state) {
      return (ids: number[]) => {
        const vars: LoxoneVariableById[] = []
        state.instances.forEach(instance => {
          instance.variables.forEach(v => {
            if (ids.includes(v.id)) vars.push({ ...v, instance })
          })
        })
        return vars
      }
    },
    getVariableLinks: (state) => {
      return (direction: VariableDirection) => {
        const list: LoxoneVariable[] = []
        state.instances.forEach(i => i.variables.forEach(v => {
          if (v.direction !== direction) return
          if (v.direction === VariableDirection.OUTPUT && v.links && v.links.length > 0) return
          return list.push(v)
        }))
        return list
      }
    },
    getInstanceById(state) {
      return (id: number) => {
        return state.instances.find(i => i.id === id)
      }
    },
  },
  actions: {
    async initialize() {
      await this.getAll()
      this.initialized = true
    },
    async getAll() {
      const { schema, entries } = await fetchAll()
      this.instances = entries
      this.instanceSchema = schema
      return this.instances
    },
    setInstances(instances: LoxoneInstance[]) {
      this.instances = instances
      this.initialized = true
      return this.instances
    },
    updateInstance(instance: LoxoneInstance) {
      const index = this.instances.findIndex(i => i.id === instance.id)
      if (index >= 0) {
        this.instances[index] = instance
      } else {
        this.instances.push(instance)
      }
    },
    updateVariable(variable: LoxoneVariable) {
      const instance = this.instances.find(i => i.id === variable.loxoneId)
      if (!instance) return
      if (variable.id === 0) {
        const index = instance.additionalInputs.findIndex(v => v.packetId === variable.packetId)
        if (index < 0) {
          instance.additionalInputs.push(variable)
        } else {
          instance.additionalInputs[index] = variable
        }
      } else {
        const index = instance.variables.findIndex(v => v.id === variable.id)
        if (index < 0) return
        instance.variables[index] = variable
      }
    }
  }
})