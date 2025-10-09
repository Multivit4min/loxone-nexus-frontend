<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import FroniusDataItem from "./FroniusDataItem.vue"

const { integration } = defineProps<{ integration: Integration }>()

</script>

<template>
  <q-card flat bordered class="q-mb-md">
    <q-card-section>
      <div class="text-h6">Site Data</div>
    </q-card-section>
    <q-card-section v-if="integration.specific.powerflow">
      <q-list dense bordered padding class="rounded-borders">
        <FroniusDataItem
          :integration="integration"
          label="Grid"
          suffix="W"
          path="powerflow.Site.P_Grid"
          caption="+ from grid | - to grid"
        />
        <FroniusDataItem
          :integration="integration"
          label="Load"
          suffix="W"
          path="powerflow.Site.P_Load"
          caption="+ generator | - consumer"
        />
        <FroniusDataItem
          :integration="integration"
          label="Akku"
          suffix="W"
          path="powerflow.Site.P_Akku"
          caption="+ discharge | - charge"
        />
        <FroniusDataItem
          :integration="integration"
          label="Autonomy"
          suffix="%"
          path="powerflow.Site.rel_Autonomy"
        />
        <FroniusDataItem
          :integration="integration"
          label="Self Consumption"
          suffix="%"
          path="powerflow.Site.rel_SelfConsumption"
        />
        <FroniusDataItem
          :integration="integration"
          label="Total Produced"
          suffix="Wh"
          path="powerflow.Site.E_Total"
        />
      </q-list>
    </q-card-section> 
  </q-card>
</template>

<style scoped></style>
