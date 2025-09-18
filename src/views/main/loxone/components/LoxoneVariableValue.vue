<script setup lang="ts">
import { LoxoneVariableType, type LoxoneVariable } from "@/api/types/loxone"
import { unforceVariable } from "@/api/loxone"

const { variable } = defineProps<{ variable: LoxoneVariable }>()

const unForce = (variable: LoxoneVariable) => {
  unforceVariable(variable.loxoneId, variable.id)
}

const { type, value} = variable.value

const getDigitalIcon = () => {
  if (variable.type !== LoxoneVariableType.DIGITAL) return "mdi-help"
  const value = variable.forced ? variable.forcedValue : variable.value
  return value ? "mdi-toggle-switch" : "mdi-toggle-switch-off-outline"
}

</script>

<template>
<label
  :class="{
    'text-red': variable.forced,
    'text-info': !variable.forced && variable.type === LoxoneVariableType.ANALOG,
    'text-grey': !variable.forced && variable.type === LoxoneVariableType.DIGITAL,
    'text-secondary': !variable.forced && variable.type === LoxoneVariableType.TEXT,
    'text-yellow': !variable.forced && variable.type === LoxoneVariableType.SmartActuatorSingleChannel
  }"
>
  <span v-if="type === LoxoneVariableType.DIGITAL">
    <q-icon :name="getDigitalIcon()" size="sm" class="q-mr-xs" />
    {{ value ? 1 : 0 }}
  </span>
  <span v-else-if="type === LoxoneVariableType.ANALOG">
    {{ variable.forced ? variable.forcedValue : value }}{{ variable.suffix }}
  </span>
  <span v-else-if="type === LoxoneVariableType.TEXT">
    "{{ variable.forced ? variable.forcedValue : value }}"{{ variable.suffix }}
  </span>
  <span v-else-if="[LoxoneVariableType.SmartActuatorSingleChannel].includes(variable.type)">
    <q-icon name="mdi-lightbulb-on-50" /> 
    <label v-if="typeof variable.value === 'object' && value !== null">{{ value.channel }}% {{ value.fadeTime }}s</label>
  </span>
  <span v-else>
    <pre>{{value}}</pre>
  </span>
  <q-btn v-if="variable.forced" flat size="sm" round color="red" @click="unForce(variable)" icon="mdi-lock-open-outline" class="p-pr-lg" />
</label>
</template>

<style scoped></style>
