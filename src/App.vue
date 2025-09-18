<script setup lang="ts">

import { storeToRefs } from "pinia"
import "./realtime"
import { useAuthStore } from "./store/auth"
import { useConfigStore } from "./store/config"

const config = useConfigStore()
const auth = useAuthStore()
const { initialized: authInit } = storeToRefs(auth)
const { initialized: configInit } = storeToRefs(config)

config.fetchGeneral()
</script>

<template>
  <main v-if="configInit">
    <RouterView />
  </main>
</template>

<style scoped></style>
