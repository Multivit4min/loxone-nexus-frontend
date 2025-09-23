import { api } from "./client"

export const restartApplication = () => {
  return api.post("/api/restart", {})
}
