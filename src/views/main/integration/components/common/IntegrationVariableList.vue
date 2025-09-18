<script setup lang="ts">
import type { QTableProps } from "quasar"
import { deleteIntegrationVariable, updateVariable } from "@/api/integration"
import { ref } from "vue"
import CreateLoxoneLink from "@/components/link/CreateLoxoneLink.vue"
import IntegrationVariableList from "../common/IntegrationVariableLinkInfoComponent.vue"
import router from "@/router"
import FormConfig from "@/components/zod/FormConfig.vue"
import type { ZodObject } from "@/components/zod/type"
import CreateVariableDialog from "./CreateVariableDialog.vue"
import type { Integration, IntegrationVariable } from "@/api/types/integrations"
import { VariableDirection } from "@/api/types/variable"

const { integration, disableFeatures } = defineProps<{
  integration: Integration,
  disableFeatures?: ("create"|"edit")[]
}>()

export type VariableActionProps = {
  id?: string
  label: string
} & Record<string, any>

defineSlots<{
  editVariable(props: { form: Record<string, any>}): void
  [key: `input_${string}`]: () => void
}>()

const columns: QTableProps["columns"] = [{
  name: "direction",
  label: "direction",
  field: "direction",
  align: "left",
  sortable: true
}, {
  name: "label",
  label: "label", 
  field: "config",
  align: "left",
  sortable: true
}, {
  name: "value",
  label: "value",
  field: "value",
  align: "left",
  sortable: true
}, {
  name: "link",
  label: "link",
  field: "link",
  align: "left",
  sortable: true
}]

/** LINK CREATION */
const linkDialog = ref(false)
const variable = ref<IntegrationVariable|undefined>()
const openLinkDialog = (v: IntegrationVariable) => {
  variable.value = v
  linkDialog.value = true
}

/** VARIABLE CREATION */
const createVariableDialog = ref(false)
const createVariableForm = ref<VariableActionProps>({ label: "" })
const openVariableCreationDialog = () => {
  createVariableDialog.value = true
  createVariableForm.value = { label: "" }
}

/** VARIABLE EDIT */
const editVariableDialog = ref(false)
const editVariableForm = ref<VariableActionProps|undefined>()
const editVariableSchema = ref<ZodObject|undefined>()
const openVariableEditDialog = (v: IntegrationVariable) => {
  const variableSchema = v.direction === VariableDirection.INPUT ? integration.inputVariableSchema : integration.outputVariableSchema
  if (!("anyOf" in variableSchema)) return console.error("invalid variable schema, anyOf not found")
  const config = variableSchema.anyOf.find(schema => {
    return (
      schema.type === "object" &&
      Object.keys(schema.properties).some(k => k === "action" && "const" in schema.properties[k] && schema.properties[k].const! === v.config.action)
    )
  }) as ZodObject
  if (!config) return console.error("no valid config schema for variable found!", v)
  editVariableSchema.value = config
  editVariableDialog.value = true
  editVariableForm.value = {
    id: v.id,
    label: v.label,
    ...v.config
  }
}

const updateVariableAction = async ({ id, label, ...props }: VariableActionProps) => {
  if (!id) return console.error("no id set for update action")
  await updateVariable(integration.id, id, { label, props })
}
</script>

<template>
  <div>
    <q-table
      :rows="integration.variables"
      :columns="columns"
      row-key="id"
      :hide-pagination="true"
      :pagination="{ rowsPerPage: 0, sortBy: 'direction' }"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :auto-width="['direction'].includes(col.name)"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.id" :class="{ selected: `#${props.row.label}` === router.currentRoute.value.hash }">
          <q-td key="direction" :props="props">
            <label v-if="props.row.direction === VariableDirection.INPUT">IN</label>
            <label v-if="props.row.direction === VariableDirection.OUTPUT">OUT</label>
          </q-td>
          <q-td key="label" :props="props">
            {{ props.row.label }}
          </q-td>
          <q-td key="value" :props="props">
            {{ props.row.value }}
          </q-td>
          <q-td key="link" :props="props">
            <IntegrationVariableList :variable="props.row" />
          </q-td>
          <q-td auto-width>
            <q-btn flat size="sm" round color="blue" @click="openLinkDialog(props.row)" icon="mdi-link" :disable="props.row.direction === VariableDirection.OUTPUT && props.row.links.length > 0" />
            <q-btn flat size="sm" round color="amber" @click="openVariableEditDialog(props.row)" icon="mdi-cog" v-if="!disableFeatures?.includes('edit')" />
            <q-btn flat size="sm" round color="red" @click="deleteIntegrationVariable(integration.id, props.row.id)" icon="mdi-delete" />
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom-row v-if="!disableFeatures?.includes('create')">
        <q-tr>
          <q-td colspan="100%" class="text-center">
            <q-btn icon="mdi-plus" flat outline dense color="primary" label="Create Variable" @click="openVariableCreationDialog()" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <CreateLoxoneLink :integration-variable="variable!" v-model:open="linkDialog" />
    <!-- VARIABLE EDIT DIALOG -->
    <q-dialog v-model="editVariableDialog">
      <q-card style="min-width:30%">
        <q-card-section>
          <q-avatar icon="mdi-pencil" />
          <span class="q-ml-sm">Edit Variable</span>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            v-model="editVariableForm!.label"
            label="Variable Name"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </q-card-section>
        <slot name="editVariable" :form="editVariableForm!">
          <FormConfig select-key="action" :zod="editVariableSchema!" :ignore="['action']" v-model="editVariableForm!">
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
            @click="updateVariableAction!(editVariableForm!)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- VARIABLE CREATE DIALOG -->
    <CreateVariableDialog :integration="integration" v-model="createVariableDialog" />
  </div>
</template>