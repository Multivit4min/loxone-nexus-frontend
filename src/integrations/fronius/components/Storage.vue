<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import FroniusDataItem from "./FroniusDataItem.vue"

const { integration, id, storage } = defineProps<{ integration: Integration, id: string, storage: any }>()

const storagePath = (id: string, key: string) => `storageRealtime[${id}].Controller.${key}`

</script>

<template>
  <span>
    <div class="caption">
      {{storage.Controller.Details.Manufacturer}} <b>{{ storage.Controller.Details.Model }}</b> ({{ id }})
    </div>
    <q-list dense bordered padding class="rounded-borders">
      <FroniusDataItem
        :integration="integration"
        label="DC Current"
        suffix="A"
        :path="storagePath(id, 'Current_DC')"
      />
      <FroniusDataItem
        :integration="integration"
        label="DC Voltage"
        suffix="V"
        :path="storagePath(id, 'Voltage_DC')"
      />
      <FroniusDataItem
        :integration="integration"
        label="StateOfCharge"
        suffix="%"
        :path="storagePath(id, 'StateOfCharge_Relative')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Cell Temperature"
        suffix="°C"
        :path="storagePath(id, 'Temperature_Cell')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Maximum capacity"
        suffix="Wh"
        :path="storagePath(id, 'Capacity_Maximum')"
      />
    </q-list>
  </span>
</template>

<style scoped></style>
