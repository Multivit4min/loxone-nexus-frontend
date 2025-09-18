<script setup lang="ts">
import { deleteIntegration, updateIntegration, type IntegrationUpdate } from "@/api/integration"
import { ref } from "vue"
import IntegrationEditDialog from "./IntegrationEditDialog.vue"
import { meta } from "../config"
import type { Integration } from "@/api/types/integrations"

const { integration } = defineProps<{ integration: Integration }>()
const confirmDelete = ref(false)

const editDialog = ref(false)
const integrationEdit = ref<IntegrationUpdate|null>(null)
const edit = () => {
  editDialog.value = true
  integrationEdit.value = {
    label: integration.label,
    config: JSON.parse(JSON.stringify(integration.config))
  }
}

const saveEditIntegration = async () => {
  if (!integrationEdit.value) return
  await updateIntegration(integration.id, {
    label: integrationEdit.value.label,
    config: integrationEdit.value.config
  })
  editDialog.value = false
}

</script>

<template>
  <q-toolbar class="text-white bg-blue">
    <q-toolbar-title>
      <q-icon :name="meta(integration.type).icon" /> {{integration.label}}
    </q-toolbar-title>
    <q-btn flat round dense icon="mdi-cogs" class="q-mr-xs">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section @click="edit()">Edit</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section @click="confirmDelete = true">Delete</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-toolbar>

  <!-- INSTANCE EDIT -->
  <q-dialog v-model="editDialog">
  <q-card  style="min-width: 30%">
    <q-card-section>
      <q-avatar icon="mdi-pencil" />
      <span class="q-ml-sm">Edit Instance</span>
    </q-card-section>
    <q-card-section>
      <IntegrationEditDialog v-model="integrationEdit!" :zod="integration.configSchema" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Update" color="primary" @click="saveEditIntegration()" v-close-popup />
    </q-card-actions>
  </q-card>
  </q-dialog>

  <!-- INSTANCE DELETE CONFIRMATION -->
  <q-dialog v-model="confirmDelete" persistent>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="warning" color="amber" />
      <span class="q-ml-sm">You are about to delete the instance {{ integration.label }}</span>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Delete" color="primary" @click="deleteIntegration(integration.id)" v-close-popup />
    </q-card-actions>
  </q-card>
  </q-dialog>

</template>

<style scoped></style>
