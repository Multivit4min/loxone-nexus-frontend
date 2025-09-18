import { api } from "./client"
import type { VariableLink } from "./types/link"

export type LinkProps = {
  integrationVariable: number
  loxoneVariable: number
}

export const createLink = (props: LinkProps) => {
  return api.post<VariableLink>("/api/link", props)
}

export const removeLink = (id: number) => {
  return api.delete(`/api/link/${id}`)
}