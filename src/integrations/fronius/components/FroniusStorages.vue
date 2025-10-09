<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import Storage from "./Storage.vue"

const { integration } = defineProps<{ integration: Integration }>()

</script>

<template>
  <q-card flat bordered class="q-mb-md" v-if="integration.specific.storageRealtime && Object.keys(integration.specific.storageRealtime).length">
    <q-card-section title>
      <div class="text-h6">Storages</div>
    </q-card-section>
    <q-card-section v-for="storage, id in integration.specific.storageRealtime">
      <Storage :integration="integration" :id="id as any" :storage="storage" />
    </q-card-section> 
  </q-card>
</template>

<style scoped></style>
