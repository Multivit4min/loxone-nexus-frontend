<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import FroniusDataItem from "./FroniusDataItem.vue"
import { ref } from "vue";

const { integration, id, meter } = defineProps<{ integration: Integration, id: string, meter: any }>()

const meterPath = (id: string, key: string) => `meterRealtime[${id}].${key}`

const all = ref(false)

</script>

<template>
  <span>
    <div class="caption">
      {{meter.Details.Manufacturer}} <b>{{ meter.Details.Model }}</b> ({{ id }})
      <q-toggle v-model="all" label="all" />
    </div>
    <q-list dense bordered padding class="rounded-borders">
      <FroniusDataItem
        :integration="integration"
        label="Voltage Phase 1"
        suffix="V"
        :path="meterPath(id, 'Voltage_AC_Phase_1')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Voltage Phase 2"
        suffix="V"
        :path="meterPath(id, 'Voltage_AC_Phase_2')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Voltage Phase 3"
        suffix="V"
        :path="meterPath(id, 'Voltage_AC_Phase_3')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Voltage Phase 1 to Phase 2"
        suffix="V"
        :path="meterPath(id, 'Voltage_AC_PhaseToPhase_12')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Voltage Phase 2 to Phase 3"
        suffix="V"
        :path="meterPath(id, 'Voltage_AC_PhaseToPhase_23')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Voltage Phase 3 to Phase 1"
        suffix="V"
        :path="meterPath(id, 'Voltage_AC_PhaseToPhase_31')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Current AC Sum"
        suffix="A"
        :path="meterPath(id, 'Current_AC_Sum')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Current AC Phase 1"
        suffix="A"
        :path="meterPath(id, 'Current_AC_Phase_1')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Current AC Phase 2"
        suffix="A"
        :path="meterPath(id, 'Current_AC_Phase_2')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Current AC Phase 3"
        suffix="A"
        :path="meterPath(id, 'Current_AC_Phase_3')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Power Real Sum"
        suffix="W"
        :path="meterPath(id, 'PowerReal_P_Sum')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Real Phase 1"
        suffix="W"
        :path="meterPath(id, 'PowerReal_P_Phase_1')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Real Phase 2"
        suffix="W"
        :path="meterPath(id, 'PowerReal_P_Phase_2')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Real Phase 3"
        suffix="W"
        :path="meterPath(id, 'PowerReal_P_Phase_3')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Power Apparent Sum"
        suffix="VA"
        :path="meterPath(id, 'PowerApparent_S_Sum')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Apparent Phase 1"
        suffix="VA"
        :path="meterPath(id, 'PowerApparent_S_Phase_1')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Apparent Phase 2"
        suffix="VA"
        :path="meterPath(id, 'PowerApparent_S_Phase_2')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Apparent Phase 3"
        suffix="VA"
        :path="meterPath(id, 'PowerApparent_S_Phase_3')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Power Reactive Sum"
        suffix="W"
        :path="meterPath(id, 'PowerReactive_Q_Sum')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Reactive Phase 1"
        suffix="VAR"
        :path="meterPath(id, 'PowerReactive_Q_Phase_1')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Reactive Phase 2"
        suffix="VAR"
        :path="meterPath(id, 'PowerReactive_Q_Phase_2')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Reactive Phase 3"
        suffix="VAR"
        :path="meterPath(id, 'PowerReactive_Q_Phase_3')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Power Factor"
        :path="meterPath(id, 'PowerFactor_Sum')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Factor Phase 1"
        :path="meterPath(id, 'PowerFactor_Phase_1')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Factor Phase 2"
        :path="meterPath(id, 'PowerFactor_Phase_2')"
      />
      <FroniusDataItem
        v-if="all"
        :integration="integration"
        label="Power Factor Phase 3"
        :path="meterPath(id, 'PowerFactor_Phase_3')"
      />
      <FroniusDataItem
        :integration="integration"
        label="Frequency Phase Average"
        suffix="Hz"
        :path="meterPath(id, 'Frequency_Phase_Average')"
      />
    </q-list>
  </span>
</template>

<style scoped></style>
