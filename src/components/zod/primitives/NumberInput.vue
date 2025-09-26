<script setup lang="ts">
import type { ValidationRule } from "quasar"
import type { ZodNumber } from "../type"
import { computed } from "vue"

const model = defineModel<Record<string, any>>({ required: true })

const { prop, id, required } = defineProps<{
  readonly required: boolean
  readonly id: string
  readonly prop: ZodNumber
}>()

if (typeof prop.default === "number" && model.value[id] === undefined) model.value[id] = prop.default

const rules = computed<ValidationRule[]>(() => {
  const rules: ValidationRule[] = []
  if (required) rules.push(val => val || `is required`)
  if (typeof prop.minimum === "number") rules.push(val => !val || val >= prop.minimum! || `minimum is ${prop.minimum}`)
  if (typeof prop.maximum === "number") rules.push(val => !val || val <= prop.maximum! || `maximum is ${prop.maximum}`)
  return rules
})

</script>

<template>
  <div>
    <q-input
      type="number"
      outlined
      v-model.number="model[id]"
      :label="`${id}${required ? '*' : ''}`"
      :hint="prop.description"
      :rules="rules"
      :required="required"
    />
  </div>
</template>

<style scoped></style>
