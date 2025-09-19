<script setup lang="ts">
  import { deleteIntegrationVariable } from "@/api/integration"
import { deleteVariable as deleteLoxoneVariable } from "@/api/loxone"
  import type { VariableTypes } from "@/api/types/variable"

  const { variable } = defineProps<{ variable: VariableTypes }>()

  const deleteAction = async () => {
    if ("loxoneId" in variable) {
      await deleteLoxoneVariable(variable.loxoneId, variable.id)
    } else if ("integrationId" in variable) {
      await deleteIntegrationVariable(variable.integrationId, variable.id)
    }
  }
</script>

<template>
  <q-btn
    flat
    size="sm"
    round
    color="red"
    @click="deleteAction()"
    icon="mdi-delete"
  />
</template>

<style scoped></style>
