import { api } from "./client"

export type Link = {
  id: number
  integrationVariableId: number
  loxoneVariableId: number
}

export type LinkProps = {
  integrationVariable: number
  loxoneVariable: number
}

export const createLink = (props: LinkProps) => {
  return api.post<Link>("/api/link", props)
}

export const removeLink = (id: number) => {
  return api.delete(`/api/link/${id}`)
}