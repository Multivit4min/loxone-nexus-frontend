<script setup lang="ts">
import { createVariable } from "@/api/loxone";
import { LoxoneVariableType, type LoxoneInstance, type LoxoneVariable } from "@/api/types/loxone"
import { VariableDirection } from "@/api/types/variable";
import { ref } from "vue"
import ValueField from "../ValueField.vue";

const { instance } = defineProps<{ instance: LoxoneInstance }>()

const openDialog = ref(false)
const form = ref<Record<string, any>>({})
const tab = ref("create")

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
  label: "SmartActuatorSingleChannel",
  value: LoxoneVariableType.SmartActuatorSingleChannel
}]

const initialVariable = {
  packetId: "",
  label: "",
  direction: VariableDirection.OUTPUT,
  type: LoxoneVariableType.DIGITAL,
  suffix: "",
  description: ""
}

const editAction = () => {
  form.value = { ...initialVariable }
  openDialog.value = true
}

const saveAction = async () => {
  if (!form.value) return
  const { packetId, direction, suffix, label, type } = form.value
  await createVariable(instance.id, { packetId, direction, type, suffix, label })
  openDialog.value = false
}

const getTypeLabel = (value: number) => {
  return modelOptions.find(model => model.value === value)
}

const copyVariableContent = (v: LoxoneVariable) => {
  if (!form.value) return
  form.value.packetId = v.packetId
  form.value.direction = v.direction
  form.value.type = v.type
  tab.value = "create"
}

</script>

<template>
  <q-tr>
    <q-td colspan="100%" class="text-center">
      <q-btn icon="mdi-plus" flat outline dense color="primary" label="Create Variable" @click="editAction()" />
      <q-dialog v-model="openDialog">
        <q-card style="min-width: 40%">
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
            <q-tab-panel name="create">
              <q-card-section>
                <div class="text-h6">Create Variable</div>
                Create a variable from scratch
              </q-card-section>
              <q-card-section>
                <q-input
                  outlined
                  v-model="form!.label"
                  label="label"
                />
              </q-card-section>
              <q-card-section>
                <q-input
                  outlined
                  v-model="form!.packetId"
                  label="packetId"
                  :rules="[v => v.length > 0 && v.length <= 8 || 'length must be between 1 and 8 chars']"
                />
              </q-card-section>
              <q-card-section>
                <q-select
                  outlined
                  v-model="form!.direction"
                  :options="[VariableDirection.INPUT, VariableDirection.OUTPUT]"
                  label="direction"
                />
              </q-card-section>
              <q-card-section>
                <q-select
                  outlined
                  v-model="form!.type"
                  :options="modelOptions"
                  label="type"
                  emit-value
                  map-options
                />
              </q-card-section>
              <q-card-section>
                <q-input outlined v-model="form!.suffix" label="suffix" />
              </q-card-section>
              <q-separator />
              <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Cancel" />
                <q-btn color="primary" @click="saveAction()" label="Add" />
              </q-card-actions>
            </q-tab-panel>
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
                      <td class="text-right"><ValueField :variable="v" /></td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card-section>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-dialog>
    </q-td>
  </q-tr>
</template>