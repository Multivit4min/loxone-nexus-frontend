<script setup lang="ts">
import { updateVariable } from "@/api/integration"
import { computed, ref } from "vue"
import FormConfig from "@/components/zod/FormConfig.vue"
import type { ZodObject } from "@/components/zod/type"
import type { IntegrationVariable } from "@/api/types/integrations"
import { VariableDirection } from "@/api/types/variable"
import { useIntegrationStore } from "@/store/integration"

const { variable } = defineProps<{
  variable: IntegrationVariable
}>()

const integrationStore = useIntegrationStore()
const { integrations } = integrationStore

const integration = computed(() => integrations.find(i => i.id === variable.integrationId))

const schema = ref()
const openDialog = ref(false)
const form = ref<Record<string, any>>({})

const editAction = () => {
  if (!integration.value) return
  const { inputVariableSchema, outputVariableSchema } = integration.value
  const varSchema = variable.direction === VariableDirection.INPUT ? inputVariableSchema : outputVariableSchema
  if (!("anyOf" in varSchema)) return console.error("invalid variable schema, anyOf not found")
  schema.value = varSchema.anyOf.find(s => {
    return (
      s.type === "object" &&
      Object.keys(s.properties).some(k => (
        k === "action" &&
        "const" in s.properties[k] &&
        s.properties[k].const! === variable.config.action
      ))
    )
  }) as ZodObject
  if (!schema.value) return console.error("no valid config schema for variable found!", variable)
  form.value = {
    label: variable.label,
    ...variable.config
  }
  openDialog.value = true
}

const saveAction = async () => {
  if (!integration.value) return console.error("no integration set")
  const { label, ...props } = form.value
  await updateVariable(integration.value.id, variable.id, { label, props })
  openDialog.value = false
}

export type VariableActionProps = {
  id?: string
  label: string
} & Record<string, any>

</script>

<template>
  <q-btn
    flat
    size="sm"
    round
    color="amber"
    @click="editAction()"
    icon="mdi-cog"
  />
  <q-dialog v-model="openDialog">
    <q-card style="min-width:40%;max-width:90%;" v-if="schema">
      <q-card-section>
        <q-avatar icon="mdi-pencil" />
        <span class="q-ml-sm">Edit Variable</span>
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="form.label"
          label="Variable Name"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      </q-card-section>
      <slot name="editVariable" :form="form!">
        <FormConfig select-key="action" :zod="schema" :ignore="['action']" v-model="form!">
          <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
            <slot :name="(name as any)" v-bind="slotProps"></slot>
          </template>
        </FormConfig>
      </slot>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="secondary" v-close-popup />
        <q-btn
          flat
          label="Update"
          color="primary"
          @click="saveAction()"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>