import { defineStore } from "pinia"
import { apiConfig, completeSetup, config, type ApiConfigResponse, type ConfigResponse, type SetupDataProps } from "@/api/config"
import { useAuthStore } from "./auth"
import router from "@/router"


export const useConfigStore = defineStore("config", {
  state: () => ({
    general: null as ApiConfigResponse|null,
    config: null as ConfigResponse|null,
    initialized: false
  }),
  actions: {
    async fetchAppSpecific() {
      this.config = await config()
      return this.config
    },
    async fetchGeneral() {
      this.general = await apiConfig()
      this.initialized = true
      return this.general
    },
    async setup(setup: SetupDataProps) {
      const { token } = await completeSetup(setup)
      const auth = useAuthStore()
      await auth.updateToken(token)
      await this.fetchGeneral()
      router.push("/")
    }
  }
})