<script setup lang="ts">
import { type Integration, createVariable } from "@/api/integration"
import { ref } from "vue"
import { VariableDirection } from "@/api/loxone"
import FormConfig from "@/components/zod/FormConfig.vue"

const { integration } = defineProps<{
  integration: Integration
}>()

export type VariableActionProps = {
  id?: string
  label: string
} & Record<string, any>

defineSlots<{
  createVariable(props: { form: Record<string, any>}): void
  [key: `input_${string}`]: () => void
}>()


/** VARIABLE CREATION */
const createVariableDialog = ref(false)
const createVariableForm = ref<VariableActionProps>({ label: "" })

const createVariableAction = (direction: VariableDirection) => {
  return async ({ id, label, ...props }: VariableActionProps) => {
    await createVariable(integration.id, {
      label,
      direction,
      props
    })
  }
}
const tab = ref<VariableDirection>(VariableDirection.OUTPUT)


</script>

<template>
  <q-dialog v-model="createVariableDialog">
    <q-card style="min-width:30%">
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
      >
        <q-tab name="OUTPUT" label="output" />
        <q-tab name="INPUT" label="input" />
      </q-tabs>

      <q-card-section>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="OUTPUT">
            <q-card-section>
              <q-input
                filled
                v-model="createVariableForm.label"
                label="Variable Name"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-card-section>
            <slot name="createVariable" :form="createVariableForm">
              <FormConfig select-key="action" :zod="integration.outputVariableSchema!" v-model="createVariableForm">
                <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
                  <slot :name="(name as any)" v-bind="slotProps"></slot>
                </template>
              </FormConfig>
            </slot>
          </q-tab-panel>
          <q-tab-panel name="INPUT">
            <q-card-section>
              <q-input
                filled
                v-model="createVariableForm.label"
                label="Variable Name"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-card-section>
            <slot name="createVariable" :form="createVariableForm">
              <FormConfig select-key="action" :zod="integration.inputVariableSchema!" v-model="createVariableForm">
                <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
                  <slot :name="(name as any)" v-bind="slotProps"></slot>
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
          @click="createVariableAction!(tab === 'INPUT' ? VariableDirection.INPUT : VariableDirection.OUTPUT)(createVariableForm)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>