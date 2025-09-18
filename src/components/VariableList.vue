<script setup lang="ts">
import { VariableDirection } from "@/api/loxone"
import type { QTableProps } from "quasar"
import type { IntegrationVariable } from "@/api/integration"
import { useIntegrationStore } from "@/store/integration"
import { meta } from "../views/main/integration/components/config"

const store = useIntegrationStore()

const { variables, ignoreFields } = defineProps<{
  variables: IntegrationVariable[]
  ignoreFields?: ("direction"|"label"|"type"|"value"|"link"|"action"|"source")[]
}>()

const ignore = ignoreFields || []

defineSlots<{
  source(props: { variable: IntegrationVariable }): void
  actions(props: { variable: IntegrationVariable }): void
  direction(props: { variable: IntegrationVariable}): void
  label(props: { variable: IntegrationVariable}): void
  value(props: { variable: IntegrationVariable}): void
  link(props: { variable: IntegrationVariable}): void
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

if (!ignore.includes("source")) {
  columns.push({
    name: "source",
    label: "Integration",
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
        <q-tr :props="props" :key="props.row.id">
          <q-td key="direction" :props="props">
            <slot name="direction" :variable="props.row">
              <label v-if="props.row.direction === VariableDirection.INPUT">IN</label>
              <label v-if="props.row.direction === VariableDirection.OUTPUT">OUT</label>
            </slot>
          </q-td>
          <q-td key="source" :props="props" auto-width>
            <slot name="source" :variable="props.row">
              <q-icon :name="meta(store.getIntegrationById(props.row.integrationId).type).icon" />
              {{ store.getIntegrationById(props.row.integrationId).label }}
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
              {{ props.row.value }}
            </slot>
          </q-td>
          <!--<q-td key="link" :props="props">
            <slot name="link" :variable="props.row" v-if="props.row.links && props.row.links.length > 0">
              <LoxoneVariableLinkInfoComponent :variable="props.row" />
            </slot>
          </q-td>-->
          <q-td key="action" :props="props" auto-width>
            <slot name="actions" :variable="props.row"></slot>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
