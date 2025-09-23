<script setup lang="ts">
  import { type UserUpdateProps } from "@/api/users"
  import { computed } from "vue"
  import { Notify } from "quasar"
  import { useUserStore } from "@/store/user"
import type { User } from "@/api/types/user"
  
  const store = useUserStore()

  const { user } = defineProps<{ user?: User }>()
  const open = defineModel<boolean>("open", { required: true })
  const form = computed<{ username: string, password: string, confirmPassword: string }>(() => ({
    username: user?.username || "",
    password: "",
    confirmPassword: ""
  }))

  const save = async () => {
    if (form.value.password !== form.value.confirmPassword) return Notify.create({ message: "Password missmatch", color: "red" })
    const props: UserUpdateProps = {}
    if (form.value.password.length > 0) props.password = form.value.password
    if (form.value.username.length > 0) props.username = form.value.username
    if (user) {
      await store.updateUser(user.id, props)
    } else {
      if (!props.username || !props.password) return Notify.create({ message: "missing user data", color:"red"})
      await store.createUser({ username: props.username, password: props.password })
    }
  }

</script>

<template>
  <q-dialog v-model="open">
    <q-card style="min-width: 300px;">
      <q-card-section>
        <div class="text-h6">{{ user ? `Edit User ${user.username}` : `Create User ${form.username}` }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="form.username"
          label="Username"
          :rules="[val => val.length >= 1 || 'not allowed to be empty']"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          type="password"
          v-model="form.password"
          label="Password"
          :rules="[val => val.length >= 6 || 'Password should have a length of minimum 6 characters']"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          type="password"
          v-model="form.confirmPassword"
          label="Confirm Password"
          :rules="[val => form.password === val || 'Password missmatch']"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Save" color="primary" @click="save()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
