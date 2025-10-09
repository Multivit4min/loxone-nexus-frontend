<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import FroniusDataItem from "./FroniusDataItem.vue"

const { integration, id, ohmpilot } = defineProps<{ integration: Integration, id: string, ohmpilot: any }>()

const ohmpilotPath = (id: string, key: string) => `powerflow.Smartloads.Ohmpilots[${id}].${key}`

</script>

<template>
  <span>
    <div class="caption">
      Id {{ id }}
    </div>
    <q-list dense bordered padding class="rounded-borders">
      <FroniusDataItem
        :integration="integration"
        label="Power"
        suffix="W"
        :path="ohmpilotPath(id, 'P_AC_Total')"
      />
      <FroniusDataItem
        :integration="integration"
        label="State"
        :path="ohmpilotPath(id, 'State')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Temperature"
        suffix="°C"
        :path="ohmpilotPath(id, 'Temperature')"
      />
    </q-list>
  </span>
</template>

<style scoped></style>
