<script setup lang="ts">
import { createVariable } from "@/api/loxone"
import { computed, ref } from "vue"
import LoxoneVariableValue from "./LoxoneVariableValue.vue"
import { useAppStore } from "@/store/app"
import { storeToRefs } from "pinia"
import { LoxoneInstanceState, LoxoneVariableType, type LoxoneInstance, type LoxoneVariable } from "@/api/types/loxone"
import { VariableDirection } from "@/api/types/variable"

const { instance } = defineProps<{ instance: LoxoneInstance }>()
const app = useAppStore()
const { debug } = storeToRefs(app)

/** true = running, false = stopped, null = transitioning */
const running = computed(() => {
  if (!instance) return
  const { state } = instance
  if (state === LoxoneInstanceState.RUNNING) {
    return true
  } else if (state === LoxoneInstanceState.STOPPED) {
    return false
  }
  return null
})

const modelOptions = [{
  label: "ANALOG",
  value: LoxoneVariableType.ANALOG
}, {
  label: "DIGITAL",
  value: LoxoneVariableType.DIGITAL
}, {
  label: "TEXT",
  value: LoxoneVariableType.TEXT
}, {
  label: "SmartActuatorRGBW",
  value: LoxoneVariableType.SmartActuatorRGBW
}, {
  label: "SmartActuatorSingleChannel",
  value: LoxoneVariableType.SmartActuatorSingleChannel
}]

function getTypeLabel(value: number) {
  return modelOptions.find(model => model.value === value)
}

const initialVariable = {
  packetId: "",
  label: "",
  direction: VariableDirection.OUTPUT,
  type: LoxoneVariableType.DIGITAL,
  suffix: "",
  description: ""
}

const tab = ref("create")
const openDialog = ref(false)
const variable = ref<typeof initialVariable|null>(null)
const openVariableDialog = () => {
  variable.value = { ...initialVariable }
  openDialog.value = true
}

const persistVariable = async () => {
  if (!variable.value) return
  const { packetId, direction, suffix, label, type } = variable.value
  createVariable(instance.id, {
    packetId,
    direction,
    type,
    suffix,
    label
  })
}

const copyVariableContent = (v: LoxoneVariable) => {
  if (!variable.value) return
  variable.value.packetId = v.packetId
  variable.value.direction = v.direction
  variable.value.type = v.type
  tab.value = "create"
}

</script>

<template> 
  <q-toolbar :class="running ? 'bg-green' : running === false ? 'bg-red' : 'bg-orange'" class="text-white">
    <q-toolbar-title>
      Variables
    </q-toolbar-title>
    <q-btn flat dense size="sm" icon="mdi-plus-box" label="create variable" @click="openVariableDialog()" />
  </q-toolbar>

  
  <q-dialog v-model="openDialog">
    <q-card style="min-width: 40%">
      <q-card-section v-if="debug">
        <pre>{{ variable }}</pre>
      </q-card-section>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="create" label="Create" />
        <q-tab name="inputs" label="Inputs" :disable="instance.additionalInputs.length === 0" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- CREATE VARIABLE -->
        <q-tab-panel name="create">
          <q-card-section>
            <div class="text-h6">Create Variable</div>
            Create a variable from scratch
          </q-card-section>
          <q-card-section>
            <q-input outlined v-model="variable!.label" label="label" />
          </q-card-section>
          <q-card-section>
            <q-input
              outlined
              v-model="variable!.packetId"
              label="packetId"
              :rules="[v => v.length > 0 && v.length <= 8 || 'length must be between 1 and 8 chars']"
            />
          </q-card-section>
          <q-card-section>
            <q-select outlined v-model="variable!.direction" :options="[VariableDirection.INPUT, VariableDirection.OUTPUT]" label="direction" />
          </q-card-section>
          <q-card-section>
            <q-select
              outlined
              v-model="variable!.type"
              :options="modelOptions"
              label="type"
              emit-value
              map-options
            />
          </q-card-section>
          <q-card-section>
            <q-input outlined v-model="variable!.suffix" label="suffix" />
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn v-close-popup flat color="primary" label="Cancel" />
            <q-btn v-close-popup color="primary" @click="persistVariable()" label="Add" />
          </q-card-actions>
        </q-tab-panel>

        <!-- Input Panel -->
        <q-tab-panel name="inputs">
          <q-card-section>
            <div class="text-h6">Inputs</div>
            Copy an existing input
          </q-card-section>
          <q-card-section>
            <q-markup-table>
              <tbody>
                <tr v-for="v in instance.additionalInputs">
                  <td class="text-left">
                    <q-btn flat size="sm" round color="green" @click="copyVariableContent(v)" icon="mdi-content-copy" />
                  </td>
                  <td class="text-right">{{ v.packetId }}</td>
                  <td class="text-right">{{ getTypeLabel(v.type)?.label }}</td>
                  <td class="text-right"><LoxoneVariableValue :variable="v" /></td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
