<script setup lang="ts">
import { exportData } from "@/api/export"
import { useQuasar } from "quasar"
import { ref, useTemplateRef, watch } from "vue"
import Importv1 from "./importv1.vue"

const quasar = useQuasar()
const backup = ref()
const fileInput = useTemplateRef<any>("uploader")
const upload = ref<File|undefined>()

const createBackup = async () => {
  const blob = await new Blob([JSON.stringify(await exportData())], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "export.json"
  a.click()
  URL.revokeObjectURL(url)
}

watch(upload, async file => {
  if (!file) return
  const reader = new FileReader()
  reader.onload = async () => {
    try {
      const data = JSON.parse(reader.result as any)
      if (typeof data.version !== "number") throw new Error(`invalid export version ${data.version}`)
      if (data.type !== "drizzle-export") throw new Error(`invalid export type ${data.type}`)
      backup.value = data
    } catch (e: any) {
      quasar.notify(`Failed to get and parse backup ${e.message}`)
    }
  }
  reader.onerror = () => quasar.notify("Failed to upload backup")
  reader.readAsText(file)
})

</script>

<template>
  <q-card flat bordered>
    <q-card-section>
      <q-btn
        color="primary"
        label="Download Backup"
        icon="mdi-download"
        @click="createBackup"
        />    

      <q-file
        type="file"
        ref="uploader"
        style="display: none"
        v-model="upload"
        accept=".json"
      />
      <q-btn
        color="primary"
        label="Select Backup"
        class="q-ml-md"
        icon="mdi-upload"
        @click="fileInput ? fileInput.pickFiles() : null"
      />

    </q-card-section>
    <Importv1
      :backup="backup"
      v-if="backup && backup.version === 1"
      @clear="backup = undefined"
    />
    <card-section v-else-if="backup">Unsupported Backup Version: v{{ backup.version }}</card-section>
  </q-card>
</template>

<style scoped></style>