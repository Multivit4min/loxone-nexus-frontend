<script setup lang="ts">
import { useConfigStore } from "@/store/config"
import KeyValueItem from "@/components/KeyValueItem.vue"
import type { LoxoneInstance } from "@/api/loxone"
import ConnectionGuide from "./ConnectionGuide.vue"
import { ref } from "vue";

const { instance } = defineProps<{ instance: LoxoneInstance }>()
const config = useConfigStore()

const connectionGuide = ref(false)
</script>

<template>
  <div>
    <q-list bordered separator>
      <KeyValueItem label="Loxone Address" :value="instance.host" />
      <KeyValueItem label="Loxone Port" :value="instance.port" />
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
