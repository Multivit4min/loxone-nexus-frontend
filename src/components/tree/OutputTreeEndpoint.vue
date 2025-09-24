<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import type { OutputTreeEndpoint } from "./tree.type"
import { ref } from "vue"
import ZodDialog from "../zod/ZodDialog.vue"
import { createVariable } from "@/api/integration"
import { VariableDirection } from "@/api/types/variable"

  const { endpoint, integration } = defineProps<{ endpoint: OutputTreeEndpoint, integration: Integration }>()
  
  const openDialog = ref(false)
  const form = ref(endpoint.config)

  const createOutputVariable = async () => {
    const { label, ...props } = form.value
    const direction = VariableDirection.OUTPUT
    await createVariable(integration.id, { label, direction, props })
    openDialog.value = false
  }

</script>

<template>
  <span>
    <ZodDialog
      :zod="integration.outputVariableSchema"
      v-model:open="openDialog"
      v-model:form="form"
      select-key="action"
      :title="`Add ${integration.label} Variable`"
      withLabel
      @submit="createOutputVariable"
    />
    <q-btn round dense size="xs" color="primary" icon="mdi-plus" @click="openDialog = true" />
    <label
      :class="{
        [endpoint.className!]: true,
        'text-bold': true,
        'text-teal': true,
        'q-ml-sm': true
      }"
    >{{ endpoint.label }}</label> 
    <span v-if="endpoint.comment" class="q-pl-sm text-grey">
      {{ endpoint.comment }}
    </span>
  </span>
</template>

<style scoped></style>
