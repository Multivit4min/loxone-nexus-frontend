<script setup lang="ts">
import { useIntegrationStore } from "@/store/integration"
import { useLoxoneStore } from "@/store/loxone"
import { socket } from "@/realtime"
import { useConfigStore } from "@/store/config"
import { useAppStore } from "@/store/app"
import { ref } from "vue"
import { watch } from "vue"
import Sidebar from "./components/sidebar/index.vue"
import Toolbar from "./components/Toolbar.vue"

socket.authenticate()

useConfigStore().fetchAppSpecific()
const loxone = useLoxoneStore()
const integration = useIntegrationStore()

Promise.all([
  loxone.initialize(),
  integration.initialize()
])

const app = useAppStore()
const debugToggle = ref(app.debug)
watch(debugToggle, value => app.setDebug(value))

const drawerOpen = ref(true)

</script>

<template>
  <q-layout view="hHh Lpr fFf">
    <Toolbar @toggle-sidebar="drawerOpen = !drawerOpen" />
    <Sidebar v-model="drawerOpen" />    
    <q-page-container>
      <q-page class="q-pa-md">
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
