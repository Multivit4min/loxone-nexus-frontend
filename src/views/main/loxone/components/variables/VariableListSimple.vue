<script setup lang="ts">
import type { QTableProps } from "quasar"
import LoxoneVariableLinkInfoComponent from "./LoxoneVariableLinkInfoComponent.vue"
import LoxoneVariableValue from "./LoxoneVariableValue.vue"
import type { LoxoneVariable } from "@/api/types/loxone"
import { VariableDirection } from "@/api/types/variable"

const { variables, ignoreFields } = defineProps<{
  variables: LoxoneVariable[]
  ignoreFields?: ("direction"|"label"|"type"|"value"|"link"|"action")[]
}>()

const ignore = ignoreFields || []

defineSlots<{
  actions(props: { variable: LoxoneVariable }): void
  direction(props: { variable: LoxoneVariable}): void
  label(props: { variable: LoxoneVariable}): void
  value(props: { variable: LoxoneVariable}): void
  link(props: { variable: LoxoneVariable}): void
}>()

const columns: QTableProps["columns"] = []

if (!ignore.includes("direction")) {
  columns.push({
    name: "direction",
    label: "direction",
    field: "direction",
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
if (!ignore.includes("action")) {
  columns.push({
    name: "action",
    label: "",
    field: "action",
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
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <label>{{ col.label }}</label>
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.index}`">
          <q-td key="direction" :props="props">
            <slot name="direction" :variable="props.row">
              <label v-if="props.row.direction === VariableDirection.INPUT">IN</label>
              <label v-if="props.row.direction === VariableDirection.OUTPUT">OUT</label>
            </slot>
          </q-td>
          <q-td key="label" :props="props">
            <slot name="label" :variable="props.row">
              {{ props.row.label || props.row.packetId }}
              <q-tooltip>
                <q-icon name="mdi-package-variant-closed" size="sm" /> {{ props.row.packetId }}
              </q-tooltip>
            </slot>
          </q-td>
          <q-td key="value" :props="props">
            <slot name="value" :variable="props.row">
              <LoxoneVariableValue :variable="props.row" />
            </slot>
          </q-td>
          <q-td key="link" :props="props">
            <slot name="link" :variable="props.row" v-if="props.row.links && props.row.links.length > 0">
              <LoxoneVariableLinkInfoComponent :variable="props.row" />
            </slot>
          </q-td>
          <q-td key="action" :props="props" auto-width>
            <slot name="actions" :variable="props.row"></slot>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
