<script setup lang="ts">
import { useAppStore } from "@/store/app"
import { useUserStore } from "@/store/user"
import { storeToRefs } from "pinia"
import { type User } from "@/api/types/user"
import { ref } from "vue"
import UserList from "./components/UserList.vue"
import UserDialog from "./components/UserDialog.vue"

  const app = useAppStore()
  const { debug } = storeToRefs(app)
  const user = useUserStore()
  const { users } = storeToRefs(user)


  const reloadUsers = () => {
    user.fetchUsers()
  }

  reloadUsers()

  const selectedUser = ref<User|undefined>()
  const openDialog = ref(false)

  const editUser = (user?: User) => {
    selectedUser.value = user
    openDialog.value = true
  }

</script>

<template>
  <div>
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Users</div>
          </div>
          <div class="col-auto">
            <q-btn flat size="md" round color="primary" @click="reloadUsers()" icon="mdi-refresh" class="p-pr-lg" />
            <q-btn flat size="md" round color="orange" @click="editUser()" icon="mdi-plus" class="p-pr-lg" />
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <UserList
          :users="users"
          :editUser="user => editUser(user)"
        />
      </q-card-section>
    </q-card>
    <pre v-if="debug">{{ users }}</pre>
    <UserDialog
      :user="selectedUser"
      v-model:open="openDialog"
      />
  </div>
</template>

<style scoped></style>
