<script setup lang="ts">
import type { LoxoneVariable } from "@/api/loxone"
import { unforceVariable, VariableType } from "@/api/loxone"

const { variable } = defineProps<{ variable: LoxoneVariable }>()

const unForce = (variable: LoxoneVariable) => {
  unforceVariable(variable.loxoneId, variable.id)
}

const getDigitalIcon = () => {
  if (variable.type !== VariableType.DIGITAL) return "mdi-help"
  const value = variable.forced ? variable.forcedValue : variable.value
  return value ? "mdi-toggle-switch" : "mdi-toggle-switch-off-outline"
}

</script>

<template>
<label
  :class="{
    'text-red': variable.forced,
    'text-info': !variable.forced && variable.type === VariableType.ANALOG,
    'text-grey': !variable.forced && variable.type === VariableType.DIGITAL,
    'text-secondary': !variable.forced && variable.type === VariableType.TEXT,
    'text-yellow': !variable.forced && variable.type === VariableType.SmartActuatorSingleChannel
  }"
>
  <span v-if="variable.type === VariableType.DIGITAL">
    <q-icon :name="getDigitalIcon()" size="sm" class="q-mr-xs" />
    {{ variable.value ? 1 : 0 }}
  </span>
  <span v-else-if="variable.type === VariableType.ANALOG">
    {{ variable.forced ? variable.forcedValue : variable.value }}{{ variable.suffix }}
  </span>
  <span v-else-if="variable.type === VariableType.TEXT">
    "{{ variable.forced ? variable.forcedValue : variable.value }}"{{ variable.suffix }}
  </span>
  <span v-else-if="[VariableType.SmartActuatorSingleChannel].includes(variable.type)">
    <q-icon name="mdi-lightbulb-on-50" /> 
    <label v-if="typeof variable.value === 'object' && variable.value !== null">{{ variable.value.channel }}% {{ variable.value.fadeTime }}s</label>
  </span>
  <span v-else>
    <pre>{{variable.value}}</pre>
  </span>
  <q-btn v-if="variable.forced" flat size="sm" round color="red" @click="unForce(variable)" icon="mdi-lock-open-outline" class="p-pr-lg" />
</label>
</template>

<style scoped></style>
