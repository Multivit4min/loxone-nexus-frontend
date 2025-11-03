<script setup lang="ts">
import { useConfigStore } from "@/store/config"
import KeyValueItem from "@/components/KeyValueItem.vue"
import ConnectionGuide from "./ConnectionGuide.vue"
import { ref, watch } from "vue"
import type { LoxoneInstance } from "@/api/types/loxone"
import { testLoxone } from "@/api/loxone"

const { instance } = defineProps<{ instance: LoxoneInstance }>()
const config = useConfigStore()

const connectionGuide = ref(false)
const testing = ref(false)
const testResult = ref<Record<string, boolean|string>>({})

const testConnection = async () => {
  testing.value = true
  testResult.value = await testLoxone(instance.id)
  testing.value = false
}

watch(() => instance, () => {
  testResult.value = {}
  testing.value = false
})
</script>

<template>
  <div>
    <q-list bordered separator>
      <KeyValueItem label="Loxone Address" :value="`${instance.host}:${instance.port}`">
        <template v-slot:sidebar>
          <div>
            <label v-for="(value, key) in testResult" >
              <q-chip v-if="value === true" dense color="green" text-color="white">Port {{ key }}</q-chip>
              <q-chip v-else dense color="red" text-color="white">Port {{ key }} {{ value }}</q-chip>
            </label>
            <q-btn
              :disable="testing"
              label="Test"
              flat
              rounded
              size="md"
              @click="testConnection()"
            />
          </div>
        </template>
      </KeyValueItem>
      <KeyValueItem label="own Id" :value="instance.ownId" />
      <KeyValueItem label="Connection Settings for Loxone" :value="`${config.config?.localAddress }:${ instance.listenPort }`">
        <template v-slot:sidebar>
          <q-btn
            label="Help"
            flat
            rounded
            size="md"
            @click="connectionGuide = true"
          />
        </template>
      </KeyValueItem>
      <KeyValueItem label="remote Id" :value="instance.remoteId" />    
    </q-list>
    <ConnectionGuide :instance="instance" v-model="connectionGuide" />
  </div>
</template>

<style scoped></style>
