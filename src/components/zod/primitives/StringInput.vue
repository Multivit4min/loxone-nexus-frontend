<script setup lang="ts">
import type { ValidationRule } from "quasar"
import type { ZodString } from "../type"
import { computed } from "vue"

const model = defineModel<Record<string, any>>({ required: true })

const { prop, id, required, patterns } = defineProps<{
  readonly required: boolean
  readonly id: string
  readonly prop: ZodString
  readonly patterns?: string[]
}>()

const isUri = (str: string) => {
  try {
    new URL(str)
    return true
  } catch (e) {
    return false
  }
}

if (prop.default) model.value[id] = prop.default

const rules = computed<ValidationRule[]>(() => {
  const rules: ValidationRule[] = []
  if (required) rules.push(val => !!val || `is required`)
  if (typeof prop.minLength === "number")
    rules.push(val => val && val.length >= prop.minLength! || `miminum ${prop.minLength} characters`)
  if (typeof prop.maxLength === "number")
    rules.push(val => val && val.length < prop.maxLength! || `maximum ${prop.maxLength} characters`)
  if (prop.format && ["ipv4", "ipv6", "hostname"].includes(prop.format)) {  
    if (typeof prop.pattern === "string")
      rules.push(val => val && new RegExp(prop.pattern!).test(val) || `pattern missmatch expected ${prop.format}`)
  }
  if (prop.format === "uri") {
    rules.push(val => val && isUri(val) || `invalid uri`)
  }
  if (patterns) {
    rules.push(val => val && patterns.some(pattern => new RegExp(pattern!).test(val)) || `pattern missmatch `)
  }
  return rules
})

</script>

<template>
  <div>
    <q-input
      outlined
      v-model="model[id]"
      :label="`${id}${required ? '*' : ''}`"
      :hint="prop.description"
      :rules="rules"
      :required="required"
    />
  </div>
</template>

<style scoped></style>
