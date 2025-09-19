<script setup lang="ts">
import { VariableValueType, type VariableTypes } from "@/api/types/variable"

const { variable } = defineProps<{ variable: VariableTypes }>()

let v = variable.value
if (!v) v = { type: VariableValueType.NULL, value: null }

const getDigitalIcon = () => {
  if (variable.value?.type !== VariableValueType.BOOLEAN) return "mdi-help"
  return variable.value.value ? "mdi-toggle-switch" : "mdi-toggle-switch-off-outline"
}

const getVariabelValue = (variable: VariableTypes, value: any) => {
  return `${value}${"suffix" in variable && variable.suffix ? variable.suffix : ""}`
}

</script>

<template>
<label
  :class="{
    'text-info': variable.value?.type === VariableValueType.NUMBER,
    'text-grey': variable.value?.type === VariableValueType.BOOLEAN,
    'text-secondary': variable.value?.type === VariableValueType.STRING,
    'text-yellow': variable.value?.type === VariableValueType.SMARTACTUATORSINGLECHANNEL
  }"
>
  <span v-if="v.type === VariableValueType.BOOLEAN">
    <q-icon :name="getDigitalIcon()" size="sm" class="q-mr-xs" />
    {{ getVariabelValue(variable, v.value ? 1 : 0) }}
  </span>
  <span v-else-if="v.type === VariableValueType.NUMBER">
    {{ getVariabelValue(variable, v.value) }}
  </span>
  <span v-else-if="v.type === VariableValueType.STRING">
    {{ getVariabelValue(variable, `"${v.value}"`) }}
  </span>
  <span v-else-if="v.type === VariableValueType.SMARTACTUATORSINGLECHANNEL">
    <q-icon name="mdi-lightbulb-on-50" /> 
    <label v-if="typeof variable.value === 'object' && v.value !== null">{{ v.value.channel }}% {{ v.value.fadeTime }}s</label>
  </span>
  <span v-else>
    <pre>{{v.value}}</pre>
  </span>
</label>
</template>

<style scoped></style>
