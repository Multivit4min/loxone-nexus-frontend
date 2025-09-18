import { login, whoami } from "@/api/auth"
import { defineStore } from "pinia"
import router from "@/router"
import type { AuthUser } from "@/api/types/user"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthUser|null,
    isAuthenticated: false,
    initialized: false
  }),
  actions: {
    async initialize() {
      this.initialized = true
      const token = localStorage.getItem("access_token")
      if (!token) return null
      return await this.whoami()
    },
    async login(username: string, password: string) {
      const { user, token } = await login(username, password)
      localStorage.setItem("access_token", token)
      this.user = user
      router.push("/")
    },
    async whoami() {
      try {
        const { user } = await whoami()
        this.user = user
      } catch {
        localStorage.removeItem("access_token")
        this.user = null
        router.push("/login")
      } finally {
        return this.user
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem("access_token")
      router.push("/login")
    },
    updateToken(token: string) {
      localStorage.setItem("access_token", token)
      return this.initialize()
    }
  }
})