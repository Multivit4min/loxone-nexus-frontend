import { api } from "./client"
import type { User, Users } from "./types/user"


export const getUsers = () => {
  return api.get<Users>("/api/users")
}

export const removeUser = (id: number) => {
  return api.delete(`/api/users/${id}`)
}

export type UserUpdateProps = {
  username?: string
  password?: string
}

export const updateUser = (id: number, props: UserUpdateProps) => {
  return api.patch<User>(`/api/users/${id}`, props)
}

export type UserCreateProps = {
  username: string
  password: string
}

export const createUser = (props: UserCreateProps) => {
  return api.post<User>("/api/users", props)
}