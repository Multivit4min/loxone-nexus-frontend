import { api } from "./client"
import { type ExportResponse } from "./types/export"

export const exportData = () => {
  return api.post<ExportResponse>("/api/export", {})
}

export const uploadBackup = (data: ExportResponse) => {
  return api.post("/api/export/upload", data)
}