<script setup lang="ts">
import { uploadBackup } from "@/api/export"
import { ref } from "vue"


export type v1Backup = {
  version: 1
  type: "drizzle-export"
  date: string
  data: {
    user: {
      id: number
      username: string
      password: string
      createdAt: string
    }[],
    loxone: {
      id: number
      active: boolean
      label: string
      host: string
      port: number
      listenPort: number
      remoteId: string
      ownId: string
    }[],
    loxoneVariables: {
      id: number
      loxoneId: number
      label: string|undefined
      direction: "INPUT"|"OUTPUT"
      packetId: string
      value: any
      suffix: string|undefined
      forced: any
      forcedValue: any
      type: number
    }[],
    integration: {      
      id: number
      label: string
      type: string
      config: any
    }[],
    integrationVariables: {        
      id: number
      integrationId: number
      label: string
      direction: "INPUT"|"OUTPUT"
      value: any
      config: any
    }[]
  }
}

const emit = defineEmits(["clear"])

const { backup } = defineProps<{
  backup: v1Backup
}>()

const { version, date, data, type } = backup

const users = ref<number[]>([])
const loxone = ref<number[]>(data.loxone.map(l => l.id))
const loxoneVariables = ref<number[]>(data.loxoneVariables.map(v => v.id))
const integrations = ref<number[]>(data.integration.map(i => i.id))
const integrationVariables = ref<number[]>(data.integrationVariables.map(i => i.id))

const upload = async () => {
  const upload: v1Backup = {
    version,
    date,
    type,
    data: {
      user: users.value.map(id => data.user.find(u => u.id === id)!).filter(e => e),
      loxone: loxone.value.map(id => data.loxone.find(l => l.id === id)!).filter(e => e),
      loxoneVariables: loxoneVariables.value.map(id => (
        data.loxoneVariables.find(v => (
          v.id === id &&
          loxone.value.includes(v.loxoneId)
        ))!
      )).filter(e => e),
      integration: integrations.value.map(id => data.integration.find(i => i.id === id)!).filter(e => e),
      integrationVariables: integrationVariables.value.map(id => (
        data.integrationVariables.find(v => (
          v.id === id &&
          integrations.value.includes(v.integrationId)
        ))!
      )).filter(e => e)
    }
  }
  await uploadBackup(upload)
  emit("clear")
}

</script>

<template>
  <q-card-section>
    <div class="q-pb-md">Backup Info <b>v{{ version }}</b> from <b>{{ new Date(date) }}</b></div>
    
    <div class="text-h6 text-primary" v-if="data.user.length > 0">Users</div>
    <div v-for="user in data.user">
      <q-checkbox dense v-model="users" :val="user.id" :label="user.username" color="teal" />
    </div>
    
    <div class="text-h6 text-primary" v-if="data.loxone.length > 0">Loxone Instances</div>
    <div v-for="instance in data.loxone">
      <q-checkbox dense v-model="loxone" :val="instance.id" color="teal">
        <b class="text-secondary">{{instance.label}}</b> @ {{instance.host}}:{{instance.port}}
      </q-checkbox>
      
      <div class="q-pl-lg" v-for="variable in data.loxoneVariables">
        <span v-if="variable.loxoneId === instance.id">
          <q-checkbox :disable="!loxone.includes(instance.id)" dense v-model="loxoneVariables" :val="variable.id" color="teal">
            <q-icon :name="variable.direction === 'INPUT' ? 'mdi-import' : 'mdi-export'" />
            <b class="q-pl-sm">{{variable.label || variable.packetId}}</b>
          </q-checkbox>

          
        </span>
      </div>
    </div>

    <div class="text-h6 text-primary" v-if="data.integration.length > 0">Integrations</div>
    <div v-for="integration in data.integration">
      <q-checkbox dense v-model="integrations" :val="integration.id" color="teal">
        <b class="text-secondary">{{integration.type}}</b> {{ integration.label }}
      </q-checkbox>

      
      <div class="q-pl-lg" v-for="variable in data.integrationVariables">
        <span v-if="variable.integrationId === integration.id">
          <q-checkbox :disable="!integrations.includes(integration.id)" dense v-model="integrationVariables" :val="variable.id" color="teal">
            <q-icon :name="variable.direction === 'INPUT' ? 'mdi-import' : 'mdi-export'" />
            <b class="q-pl-sm">{{variable.label}}</b>
          </q-checkbox>
        </span>
      </div>
    </div>
  </q-card-section>
  <q-card-actions>
    <q-btn
      color="primary"
      icon="mdi-upload"
      label="Upload"
      @click="upload()"
    />
  </q-card-actions>
</template>

<style scoped></style>