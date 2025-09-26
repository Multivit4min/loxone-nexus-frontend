<script setup lang="ts">
import type { IntegrationVariables } from "@/api/types/integrations"
import { VariableDirection } from "@/api/types/variable"
import { computed, ref } from "vue"

const { modelValue, updateModelValue, variables } = defineProps<{
  modelValue?: string[],
  updateModelValue: (val: string[]) => void,
  variables: IntegrationVariables
}>()

const model = ref<string[]>(modelValue||[])

const options = computed(() => {
  return variables
    .filter(v => v.direction === VariableDirection.INPUT)
    .filter(v => v.config.action === "event")
    .map(v => ({
      label: v.label || v.id,
      value: v.id
    }))
})

</script>

<template>
  <q-card-section>
    <q-select
      v-model="model"
      :options="options"
      @update:modelValue="() => updateModelValue(model)"
      label="Variable"
      emitValue
      mapOptions
    />
  </q-card-section>
</template>

<style scoped></style>
