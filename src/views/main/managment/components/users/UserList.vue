<script setup lang="ts">
import { useUserStore } from "@/store/user"
import { storeToRefs } from "pinia"
import { type User } from "@/api/types/user"

  const user = useUserStore()
  const { users } = storeToRefs(user)

  const { editUser } = defineProps<{ editUser: (user: User) => void }>()

  const columns = [{
    name: "username",
    field: "username",
    label: "Username",
    align: "left" as const,
    sortable: true
  }, {
    name: "createdAt",
    field: "createdAt",
    label: "created at",
    align: "left" as const,
    sortable: true
  }]

</script>

<template>
  <q-table 
    :columns="columns" 
    :rows="users"
    key="id"
    :hide-pagination="true"
    :pagination="{ 'rowsPerPage': 0 }"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          <label>{{ col.label }}</label>
        </q-th>
        <q-th auto-width />
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.value }}
        </q-td>
        <q-td>
          <q-btn
            flat
            size="sm"
            round
            color="orange"
            @click="editUser(props.row)"
            icon="mdi-pencil"
            class="p-pr-lg"
          />
          <q-btn
            flat
            size="sm"
            round
            color="red"
            @click="user.deleteUser(props.row.id)"
            class="p-pl-lg"
            icon="mdi-delete"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped></style>
