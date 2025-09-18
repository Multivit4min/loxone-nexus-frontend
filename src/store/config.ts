import { defineStore } from "pinia"
import { apiConfig, completeSetup, config, type ApiConfig, type Config, type SetupData } from "@/api/config"
import { useAuthStore } from "./auth"
import router from "@/router"


export const useConfigStore = defineStore("config", {
  state: () => ({
    general: null as ApiConfig|null,
    config: null as Config|null,
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
    async setup(setup: SetupData) {
      const { token } = await completeSetup(setup)
      const auth = useAuthStore()
      await auth.updateToken(token)
      await this.fetchGeneral()
      router.push("/")
    }
  }
})