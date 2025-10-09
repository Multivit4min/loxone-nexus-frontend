<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import Ohmpilot from "./Ohmpilot.vue"

const { integration } = defineProps<{ integration: Integration }>()

</script>

<template>
  <q-card flat bordered class="q-mb-md" v-if="integration.specific.powerflow && Object.keys(integration.specific.powerflow.Smartloads.Ohmpilots).length">
    <q-card-section title>
      <div class="text-h6">Ohmpilots</div>
    </q-card-section>
    <q-card-section v-for="ohmpilot, id in integration.specific.powerflow.Smartloads.Ohmpilots">
      <Ohmpilot :integration="integration" :id="id as any" :ohmpilot="ohmpilot" />
    </q-card-section> 
  </q-card>
</template>

<style scoped></style>
