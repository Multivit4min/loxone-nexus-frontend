<script setup lang="ts">
import { useAuthStore } from "@/store/auth"
import { socket } from "@/realtime"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/app"
import { ref } from "vue"
import { watch } from "vue"

socket.authenticate()

const auth = useAuthStore()
const { user } = storeToRefs(auth)

const app = useAppStore()
const debugToggle = ref(app.debug)
watch(debugToggle, value => app.setDebug(value))


</script>

<template>
<q-btn
  color="blue"
  icon="mdi-cogs"
  :label="user?.username"
>
  <q-menu transition-show="jump-down" transition-hide="jump-up">
    <q-list style="min-width: 100px">
      <q-item router-link to="/managment">
        <q-item-section avatar>
          <q-icon name="mdi-cogs" />
        </q-item-section>
        <q-item-section>Managment</q-item-section>
      </q-item>
      <q-item router-link to="/" exact>
        <q-item-section avatar>
          <q-icon name="mdi-help" />
        </q-item-section>
        <q-item-section>Help</q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section avatar>
          <q-toggle v-model="debugToggle" />
        </q-item-section>
        <q-item-section>Debug</q-item-section>
      </q-item>
      <q-separator />
      <q-item @click="auth.logout()" clickable>
        <q-item-section avatar>
          <q-icon name="mdi-logout" />
        </q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</q-btn>
</template>

<style scoped></style>
