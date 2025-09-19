<script setup lang="ts">
import { updateVariable } from "@/api/loxone"
import type { LoxoneVariable } from "@/api/types/loxone"
import { ref } from "vue"

const { variable } = defineProps<{ variable: LoxoneVariable }>()

const openDialog = ref(false)
const form = ref({
  label: "",
  suffix: ""
})

const editAction = () => {
  form.value.label = variable.label || "",
  form.value.suffix = variable.suffix || ""
  openDialog.value = true
}

const saveAction = async () => {
  await updateVariable({
    instanceId: variable.loxoneId,
    variableId: variable.id,
    ...form.value
  })
  openDialog.value = false
}
</script>

<template>
  <q-btn flat size="sm" round color="orange" @click="editAction()" icon="mdi-pencil" class="p-pr-lg" />
  <q-dialog v-model="openDialog">
    <q-card style="min-width: 300px;">
      <q-card-section>
        <div class="text-h6">{{ variable.label || variable.packetId }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input outlined v-model="form.label" label="Label" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input outlined v-model="form.suffix" label="Suffix" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Save" color="primary" @click="saveAction()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>