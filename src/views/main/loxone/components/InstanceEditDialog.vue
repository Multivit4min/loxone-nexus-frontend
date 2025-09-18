<script setup lang="ts">

export interface EditLoxoneInstanceModel {
  label: string
  host: string
  port: number
  listenPort: number
  remoteId: string
  ownId: string
}

const [model] = defineModel<EditLoxoneInstanceModel>({
  required: true,
  set(value) {
    return value
  }
})

const DEFAULT_PORT = 61263
const isValidHost = (value: string) => {
  return (
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value) ||
    /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/.test(value)
  )
}

</script>

<template>
  <q-form class="q-gutter-md">
    <q-input
      filled
      v-model="model.label"
      label="Miniserver label"
      hint="arbitary name"
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />
    <q-input
      filled
      v-model="model.host"
      label="Host"
      hint="IP or Domain Name to connect to"
      :rules="[ val => isValidHost(val) || 'Please type something']"
    />
    <q-input
      filled
      type="number"
      v-model.number="model.port"
      label="Port"
      :hint="`Default is ${DEFAULT_PORT}`"
      :rules="[val => val > 1024 && val <= 65535 || 'Please type a valid port']"
    />
    <q-input
      filled
      type="number"
      v-model.number="model.listenPort"
      label="Listen Port"
      :hint="`Default is ${DEFAULT_PORT}, Port which the Server will listen for incoming packets`"
      :rules="[val => val > 1024 && val <= 65535 || 'Please type a valid port']"
    />
    <q-input
      filled
      v-model="model.remoteId"
      label="Remote ID"
      hint="remote id defined in loxone config"
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />
    <q-input
      filled
      v-model="model.ownId"
      label="Remote ID"
      hint="remote id defined in loxone config"
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />
  </q-form>
</template>

<style scoped></style>
