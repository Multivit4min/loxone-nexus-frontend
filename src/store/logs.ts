import { defineStore } from "pinia"


export const useLogStore = defineStore("logs", {
  state: () => ({
    logs: [] as any[]
  }),
  actions: {

  }
})