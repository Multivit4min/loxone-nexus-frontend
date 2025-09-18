<script setup lang="ts">
import { GITHUB_URL } from "@/config"
import UserMenu from "./UserMenu.vue"

const emit = defineEmits<{ (e:"toggleSidebar"): void }>()

</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="mdi-menu" @click="emit('toggleSidebar')" />
      <q-toolbar-title>
        <q-btn flat router-link to="/" size="md" dense label="Loxone Nexus" />
      </q-toolbar-title>
      
      <q-btn
        flat
        class="q-mr-md"
        color="grey"
        v-if="GITHUB_URL"
        target="_blank"
        :href="GITHUB_URL"
        icon="mdi-github"
      />
      <UserMenu />

    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
