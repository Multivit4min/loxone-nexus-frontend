<script setup lang="ts">
import { VariableValueType, type VariableTypes } from "@/api/types/variable"

const { variable } = defineProps<{ variable: VariableTypes }>()

const getDigitalIcon = () => {
  if (variable.value?.type !== VariableValueType.BOOLEAN) return "mdi-help"
  return variable.value.value ? "mdi-toggle-switch" : "mdi-toggle-switch-off-outline"
}

const getVariabelValue = (variable: VariableTypes, value: any) => {
  return `${value}${"suffix" in variable && variable.suffix ? variable.suffix : ""}`
}

</script>

<template>
  <span v-if="variable.value">
    <span v-if="variable.value.type === VariableValueType.BOOLEAN" class="text-grey">
      <q-icon :name="getDigitalIcon()" size="sm" class="q-mr-xs" />
      {{ getVariabelValue(variable, variable.value.value ? 1 : 0) }}
    </span>
    <span v-else-if="variable.value.type === VariableValueType.NUMBER" class="text-info">
      {{ getVariabelValue(variable, variable.value.value) }}
    </span>
    <span v-else-if="variable.value.type === VariableValueType.STRING" class="text-secondary">
      {{ getVariabelValue(variable, `"${variable.value.value}"`) }}
    </span>
    <span v-else-if="variable.value.type === VariableValueType.SMARTACTUATORSINGLECHANNEL" class="text-yellow">
      <q-icon name="mdi-lightbulb-on-50" class="q-mr-xs" /> 
      <label v-if="typeof variable.value === 'object' && variable.value.value !== null">{{ variable.value.value.channel }}% {{ variable.value.value.fadeTime }}s</label>
    </span>
    <span v-else-if="variable.value.type === VariableValueType.SMARTACTUATORRGBW">
      <q-icon name="mdi-lightbulb-on" class="text-yellow q-mr-xs" /> 
      <label class="text-red">{{ variable.value.value.red }}% </label>
      <label class="text-green">{{ variable.value.value.green }}% </label>
      <label class="text-blue">{{ variable.value.value.blue }}% </label>
      <label class="text-yellow">{{ variable.value.value.white }}% </label>
      <label class="text-yellow">{{ variable.value.value.fadeTime }}s </label>
    </span>
    <span v-else>
      <pre>{{variable.value}}</pre>
    </span>
  </span>
</template>

<style scoped></style>
