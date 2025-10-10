<script setup lang="ts">
import type { QTableColumn } from "quasar"
import { type VariableTypes } from "@/api/types/variable"
import ValueField from "./fields/ValueField.vue"
import SourceField from "./fields/SourceField.vue"
import LinkField from "./fields/LinkField.vue"
import DirectionField from "./fields/DirectionField.vue"
import LabelField from "./fields/LabelField.vue"
import ActionField from "./fields/ActionField.vue"
import CreateLoxoneVariableAction from "./fields/actions/CreateLoxoneVariableAction.vue"
import type { LoxoneInstance } from "@/api/types/loxone"
import type { Integration } from "@/api/types/integrations"
import { computed } from "vue"
import CreateIntegrationVariableAction from "./fields/actions/CreateIntegrationVariableAction.vue"
import type { ZodDataType } from "../zod/type"

export interface IVariableInterface {
  variables: VariableTypes[]
}

const { instance, disable } = defineProps<{
  instance: IVariableInterface|LoxoneInstance|Integration
  disable?: ("direction"|"source"|"label"|"type"|"value"|"link"|"actions"|"create"|"action.edit")[]
  //general input description for specified name
  [key: `$zod[input#${string}]`]: () => void
  //create variable selected action description
  [key: `$zod[selected#${string}]`]: () => void
  //create variable selected action + fieldname description
  [key: `$zod[${string}.${string}]`]: () => void
  //create a custom input field on action + fieldname
  [key: `zod[custom.input#${string}.${string}]`]: (props: {
    zod: ZodDataType
    
  }) => void
  //create a custom input field on fieldname
  //[key: `zod[custom#${string}]`]: () => void
}>()

const variables = computed(() => instance.variables)

const ignore = disable || []

defineSlots<{
  //create variable selected action description
  [key: `$zod[selected#${string}]`]: () => void
  //create variable selected action + field name description
  [key: `$zod[${string}.${string}]`]: () => void
  source(props: { variable: VariableTypes }): void
  actions(props: { variable: VariableTypes }): void
  direction(props: { variable: VariableTypes}): void
  label(props: { variable: VariableTypes}): void
  value(props: { variable: VariableTypes}): void
  link(props: { variable: VariableTypes}): void
}>()

const columns: QTableColumn<any>[] = []

if (!ignore.includes("direction")) {
  columns.push({
    name: "direction",
    label: "",
    field: "direction",
    align: "left",
    sortable: true
  })
}

if (!ignore.includes("source")) {
  columns.push({
    name: "source",
    label: "Source",
    field: "source",
    align: "left",
    sortable: true
  })
}

if (!ignore.includes("label")) {
  columns.push({
    name: "label",
    label: "label",
    field: "label",
    align: "left",
    sortable: true
  })
}

if (!ignore.includes("value")) {
  columns.push({
    name: "value",
    label: "value",
    field: "value",
    align: "left",
    sortable: true,
  })
}

if (!ignore.includes("link")) {
  columns.push({
    name: "link",
    label: "link",
    field: "link",
    align: "left",
    sortable: true,
  })
}

if (!ignore.includes("actions")) {
  columns.push({
    name: "actions",
    label: "",
    field: "actions",
    align: "right",
    sortable: false,
  })
}

</script>

<template>
  <div>
    <q-table
      :rows="variables"
      :columns="columns"
      row-key="id"
      :hide-pagination="true"
      :pagination="{ rowsPerPage: 0, sortBy: 'direction' }"
      :hide-no-data="!ignore.includes('create')"
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
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="props.row.id">
          <q-td key="direction" :props="props">
            <slot name="direction" :variable="props.row">
              <DirectionField :variable="props.row" />
            </slot>
          </q-td>
          <q-td key="source" :props="props" auto-width>
            <slot name="source" :variable="props.row">
              <SourceField :variable="props.row" />
            </slot>
          </q-td>
          <q-td key="label" :props="props">
            <slot name="label" :variable="props.row">
              <LabelField :variable="props.row" />
            </slot>
          </q-td>
          <q-td key="value" :props="props">
            <slot name="value" :variable="props.row">
              <ValueField :variable="props.row" />
            </slot>
          </q-td>
          <q-td key="link" :props="props">
            <slot name="link" :variable="props.row">
              <LinkField :variable="props.row" v-if="props.row.links.length > 0" />
            </slot>
          </q-td>
          <q-td key="actions" :props="props" auto-width>
            <slot name="actions" :variable="props.row">
              <ActionField
                :variable="props.row"
                :disable="ignore"
              >
                <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
                  <slot :name="<any>name" v-bind="slotProps"></slot>
                </template>
              </ActionField>
            </slot>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom-row v-if="!ignore?.includes('create')">
        <CreateLoxoneVariableAction :instance="instance" v-if="'host' in instance" />
        <CreateIntegrationVariableAction :instance="instance" v-if="'config' in instance">
          <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
            <slot :name="<any>name" v-bind="slotProps"></slot>
          </template>
        </CreateIntegrationVariableAction>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
