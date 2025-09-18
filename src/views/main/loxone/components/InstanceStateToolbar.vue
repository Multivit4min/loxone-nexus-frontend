<script setup lang="ts">
import { updateLoxone } from "@/api/loxone"
import { computed, ref } from "vue"
import {
  deleteInstance,
  startLoxone,
  stopLoxone,
} from "@/api/loxone"
import InstanceEditDialog from "./InstanceEditDialog.vue"
import { LoxoneInstanceState, type LoxoneInstance } from "@/api/types/loxone"

const { instance } = defineProps<{ instance: LoxoneInstance }>()
const confirmDelete = ref(false)


/** true = running, false = stopped, null = transitioning */
const running = computed(() => {
  if (!instance) return
  const { state } = instance
  if (state === LoxoneInstanceState.RUNNING) {
    return true
  } else if (state === LoxoneInstanceState.STOPPED) {
    return false
  }
  return null
})

const toggleInstanceState = () => {
  if (!instance) return
  if (running.value) {
    stopLoxone(instance.id)
  } else if (running.value === false) {
    startLoxone(instance.id)
  }
}

const editDialog = ref(false)
const instanceEdit = ref<LoxoneInstance|null>(null)
const edit = () => {
  editDialog.value = true
  instanceEdit.value = { ...instance }
}

const saveEditInstance = async () => {
  if (!instanceEdit.value) return
  await updateLoxone(instance.id, {
    label: instanceEdit.value.label,
    host: instanceEdit.value.host,
    port: instanceEdit.value.port,
    remoteId: instanceEdit.value.remoteId,
    ownId: instanceEdit.value.ownId,
    listenPort: instanceEdit.value.listenPort
  })
  editDialog.value = false
}

</script>

<template>
  <q-toolbar :class="running ? 'bg-green' : running === false ? 'bg-red' : 'bg-orange'" class="text-white">
    <q-toolbar-title>
      {{instance.label}}
    </q-toolbar-title>
    <q-btn @click="toggleInstanceState()" flat round dense v-if="running !== null" :icon="running === true ? 'mdi-stop' : 'mdi-play'" class="q-mr-xs" />
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
      <q-avatar icon="edit" />
      <span class="q-ml-sm">Edit Instance</span>
    </q-card-section>
    <q-card-section>
      <InstanceEditDialog v-model="instanceEdit!" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Update" color="primary" @click="saveEditInstance()" v-close-popup />
    </q-card-actions>
  </q-card>
  </q-dialog>

  <!-- INSTANCE DELETE CONFIRMATION -->
  <q-dialog v-model="confirmDelete" persistent>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="warning" color="amber" />
      <span class="q-ml-sm">You are about to delete the instance {{ instance.label }}</span>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Delete" color="primary" @click="deleteInstance(instance.id)" v-close-popup />
    </q-card-actions>
  </q-card>
  </q-dialog>

</template>

<style scoped></style>
