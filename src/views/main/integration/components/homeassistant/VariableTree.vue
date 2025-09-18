<script setup lang="ts">
import { ref } from "vue"
import { createVariable, getInternalVariables } from "@/api/integration"
import { TreeGenerator, type HomeAssistantAction, type HomeAssistantInput, type HomeAssistantState, type Node, type Tree } from "./TreeGenerator"
import type { Integration } from "@/api/types/integrations"
import { VariableDirection } from "@/api/types/variable"

const { integration } = defineProps<{ integration: Integration, filter?: string }>()

export type ServiceResponse = Record<string, {
  name: string
  description?: string
  type: "string"|"number"|"boolean"
}[]>

export type HomeAssistantVariableResponse = {
  states: HomeAssistantState[]
}

const filter = ref<string>("")

const tree = ref<Tree>([{
  label: "inputs",
  header: "root",
  children: []
}, {
  label: "outputs",
  header: "root",
  children: []
}])

const buildTree = async () => {
  const { states } = await getInternalVariables<HomeAssistantVariableResponse>(integration.id)
  tree.value = TreeGenerator.build(states, integration.actions)
}

buildTree()

const createInputVariable = async (input: HomeAssistantInput) => {
  await createVariable(integration.id, {
    label: input.entityId,
    direction: VariableDirection.INPUT,
    props: {
      action: "state",
      entityId: input.entityId,
      key: input.key
    }
  })
}
const createOutputVariable = async (output: HomeAssistantAction) => {
  await createVariable(integration.id, {
    label: `${output.entityId} > ${output.id}`,
    direction: VariableDirection.OUTPUT,
    props: {
      entityId: output.entityId,
      action: output.id
    }
  })
}

const inputExists = (input: HomeAssistantInput) => {
  return integration.variables.some(v => (
    v.config.entityId === input.entityId &&
    v.config.key === input.key
  ))
}

const outputExists = (output: HomeAssistantAction) => {
  return integration.variables.some(v => (
    v.config.entityId === output.entityId &&
    v.config.action === output.id
  ))
}

const filterMethod = (node: Node, filter: string) => {
  const f = filter.toLowerCase()
  const ok = (
    node.label.toLowerCase().includes(f) ||
    (node.header === "input" && String(node.value).toLowerCase().includes(f))
  )
  return ok
}

</script>

<template>
  <div>
    <q-input ref="filterRef" filled v-model="filter" label="Search">
      <template v-slot:append>
        <q-icon v-if="filter !== ''" name="mdi-trash" class="cursor-pointer" @click="filter=''" />
      </template>
    </q-input>

    <q-tree :nodes="[tree[0]]" dense node-key="label" :filter="filter" class="q-mt-md" :filter-method="filterMethod">

      <template v-slot:header-root="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-info">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:header-namespace="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:header-entity="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-secondary">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:header-input="prop">
        <q-btn round dense size="xs" color="primary" icon="mdi-plus" @click="createInputVariable(prop.node)" :disable="inputExists(prop.node)" />
        <div class="q-ml-sm text-weight-bold">{{ prop.node.label }}</div>
        <div class="q-ml-sm q-mr-sm text-caption" v-if="typeof prop.node.value === 'string'">
          "{{ prop.node.value }}"
        </div>
        <div class="q-ml-sm q-mr-sm text-caption" v-if="typeof prop.node.value === 'number'">
          {{ prop.node.value }}
        </div>
        <div class="q-ml-sm q-mr-sm text-caption" v-if="typeof prop.node.value === 'boolean'">
          {{ prop.node.value }}
        </div>
      </template>

    </q-tree>
    
    <q-tree :nodes="[tree[1]]" dense node-key="label" :filter="filter" :filter-method="filterMethod">

      <template v-slot:header-root="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-info">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:header-namespace="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:header-entity="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-secondary">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:header-output="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-secondary">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:header-action="prop">
        <q-btn round dense size="xs" color="primary" icon="mdi-plus" @click="createOutputVariable(prop.node)" :disable="outputExists(prop.node)" />
        <div class="row items-center">
          <div class="q-ml-sm text-weight-bold text-secondary">{{ prop.node.label }}</div>
          <div class="q-ml-sm q-mr-sm text-accent">{{ prop.node.type }}</div>
          <div class="q-ml-sm q-mr-sm">{{ prop.node.description }}</div>
        </div>
      </template>

    </q-tree>
  </div>
</template>

<style scoped></style>
