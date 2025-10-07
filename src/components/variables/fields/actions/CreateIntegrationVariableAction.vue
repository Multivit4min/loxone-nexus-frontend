<script setup lang="ts">
import { createVariable } from "@/api/integration"
import { ref } from "vue"
import FormConfig from "@/components/zod/FormConfig.vue"
import type { Integration } from "@/api/types/integrations"
import { VariableDirection } from "@/api/types/variable"

const { instance } = defineProps<{
  instance: Integration
}>()

const openDialog = ref(false)
const form = ref<Record<string, any>>({ label: "" })

export type VariableActionProps = {
  id?: string
  label: string
} & Record<string, any>


const editAction = () => {
  form.value = { label: "" }
  openDialog.value = true
}

const saveAction = async (direction: VariableDirection) => {
  if (!form.value) return
  const { label, ...props } = form.value
  await createVariable(instance.id, { label, direction, props })
  openDialog.value = false
}

const hasInputs = 'anyOf' in instance.inputVariableSchema && instance.inputVariableSchema.anyOf.length > 0
const hasOutputs = "anyOf" in instance.outputVariableSchema && instance.outputVariableSchema.anyOf.length > 0
const tab = ref<VariableDirection>(hasOutputs ? VariableDirection.OUTPUT : VariableDirection.INPUT)

</script>

<template>  
  <q-tr>
    <q-td colspan="100%" class="text-center">
      <q-btn icon="mdi-plus" flat outline dense color="primary" label="Create Variable" @click="editAction()" />
        <q-dialog v-model="openDialog">
          <q-card style="min-width:40%;max-width:90%;">
            <q-card-section>
              <q-avatar icon="mdi-pencil" />
              <span class="q-ml-sm">Create Variable</span>
            </q-card-section>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
              v-if="hasOutputs && hasInputs"
            >
              <q-tab name="OUTPUT" label="output" v-if="hasOutputs" />
              <q-tab name="INPUT" label="input" v-if="hasInputs" />
            </q-tabs>

            <q-card-section>
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="OUTPUT">
                  <q-card-section>
                    <q-input
                      filled
                      v-model="form.label"
                      label="Variable Name"
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </q-card-section>
                  <FormConfig select-key="action" :zod="instance.outputVariableSchema!" v-model="form">
                    <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
                      <slot :name="name" v-bind="slotProps"></slot>
                    </template>
                  </FormConfig>
                </q-tab-panel>
                <q-tab-panel name="INPUT">
                  <q-card-section>
                    <q-input
                      filled
                      v-model="form.label"
                      label="Variable Name"
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </q-card-section>
                  <slot name="createVariable" :form="form">
                    <FormConfig select-key="action" :zod="instance.inputVariableSchema!" v-model="form">
                      <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
                        <slot :name="name" v-bind="slotProps"></slot>
                      </template>
                    </FormConfig>
                  </slot>
                </q-tab-panel>
              </q-tab-panels>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="secondary" v-close-popup />
              <q-btn
                flat
                label="Create"
                color="primary"
                @click="saveAction(tab === 'INPUT' ? VariableDirection.INPUT : VariableDirection.OUTPUT)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
    </q-td>
  </q-tr>
</template>