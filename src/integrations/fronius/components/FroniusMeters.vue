<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import Meter from "./Meter.vue"

const { integration } = defineProps<{ integration: Integration }>()

</script>

<template>
  <q-card
    flat
    bordered
    class="q-mb-md"
    v-if="integration.specific.meterRealtime && Object.keys(integration.specific.meterRealtime).length"
  >
    <q-card-section title>
      <div class="text-h6">Meters</div>
    </q-card-section>
    <q-card-section v-for="meter, id in integration.specific.meterRealtime">
      <Meter :integration="integration" :id="id as any" :meter="meter" />
    </q-card-section> 
  </q-card>
</template>

<style scoped></style>
