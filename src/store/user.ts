import type { Users } from "@/api/types/user"
import { createUser, getUsers, removeUser, updateUser, type UserCreateProps, type UserUpdateProps } from "@/api/users"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as Users
  }),
  getters: {
    getUserIndex(store) {
      return (id: number) => store.users.findIndex(user => user.id === id)
    }
  },
  actions: {
    async fetchUsers() {
      this.users = await getUsers()
    },
    async updateUser(id: number, props: UserUpdateProps) {
      const user = await updateUser(id, props)
      const index = this.getUserIndex(user.id)
      if (index < 0) {
        this.users.push(user)
      } else {
        this.users[index] = user
      }
    },
    async deleteUser(id: number) {
      await removeUser(id)
      const index = this.getUserIndex(id)
      if (index < 0) return
      this.users.splice(index, 1)
    },
    async createUser(props: UserCreateProps) {
      this.users.push(await createUser(props))
    }
  }
})