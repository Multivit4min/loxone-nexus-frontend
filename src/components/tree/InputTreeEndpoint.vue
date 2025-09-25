<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import type { InputTreeEndpoint } from "./tree.type"
import { ref } from "vue"
import ZodDialog from "../zod/ZodDialog.vue"
import { createVariable } from "@/api/integration"
import { VariableDirection } from "@/api/types/variable"

  const { endpoint, integration } = defineProps<{ endpoint: InputTreeEndpoint, integration: Integration }>()
  
  const openDialog = ref(false)
  const form = ref(endpoint.config)

  const createInputVariable = async () => {
    const { label, ...props } = form.value
    const direction = VariableDirection.INPUT
    await createVariable(integration.id, { label, direction, props })
    openDialog.value = false
  }

</script>

<template>
  <span>
    <ZodDialog
      :zod="integration.inputVariableSchema"
      v-model:open="openDialog"
      v-model:form="form"
      select-key="action"
      :title="`Add ${integration.label} Variable`"
      withLabel
      @submit="createInputVariable"
    >
      <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
        <slot :name="<any>name" v-bind="slotProps"></slot>
      </template>
    </ZodDialog>
    <q-btn round dense size="xs" color="primary" icon="mdi-plus" @click="openDialog = true" />
    <label
      :class="{
        [endpoint.className!]: true,
        'text-bold': true,
        'text-teal': true,
        'q-ml-sm': true
      }"
    >{{ endpoint.label }}</label> 
    <span class="q-pl-sm text-grey">
      <label v-if="typeof endpoint.value === 'string'">
        "{{ endpoint.value }}"
      </label>
      <label v-else>
        {{ endpoint.value }}
      </label>
      <label v-if="endpoint.comment" class="q-pl-sm text-grey">{{ endpoint.comment }}</label>
    </span>
  </span>
</template>

<style scoped></style>
