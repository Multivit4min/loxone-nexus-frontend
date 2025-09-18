import { defineStore } from "pinia"

export const useAppStore = defineStore("app", {
  state: () => ({
    debug: JSON.parse(localStorage.getItem("debug")||"false")
  }),
  actions: {
    async setDebug(to: boolean) {
      this.debug = to
      localStorage.setItem("debug", JSON.stringify(this.debug))
      return this.debug
    },
  }
})