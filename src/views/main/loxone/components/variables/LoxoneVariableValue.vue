<script setup lang="ts">
import { type LoxoneVariable } from "@/api/types/loxone"
import { unforceVariable } from "@/api/loxone"
import { VariableValueType } from "@/api/types/variable"

const { variable } = defineProps<{ variable: LoxoneVariable }>()

const unForce = (variable: LoxoneVariable) => {
  unforceVariable(variable.loxoneId, variable.id)
}

const v = variable.value

const getDigitalIcon = () => {
  if (variable.value?.type !== VariableValueType.BOOLEAN) return "mdi-help"
  const value = variable.forced ? variable.forcedValue : variable.value.value
  return value ? "mdi-toggle-switch" : "mdi-toggle-switch-off-outline"
}

</script>

<template>
<label
  :class="{
    'text-red': variable.forced,
    'text-info': !variable.forced && variable.value?.type === VariableValueType.NUMBER,
    'text-grey': !variable.forced && variable.value?.type === VariableValueType.BOOLEAN,
    'text-secondary': !variable.forced && variable.value?.type === VariableValueType.STRING,
    'text-yellow': !variable.forced && variable.value?.type === VariableValueType.SMARTACTUATORSINGLECHANNEL
  }"
>
  <span v-if="v?.type === VariableValueType.BOOLEAN">
    <q-icon :name="getDigitalIcon()" size="sm" class="q-mr-xs" />
    {{ v?.value ? 1 : 0 }}
  </span>
  <span v-else-if="v?.type === VariableValueType.NUMBER">
    {{ variable.forced ? variable.forcedValue : v?.value }}{{ variable.suffix }}
  </span>
  <span v-else-if="v?.type === VariableValueType.STRING">
    "{{ variable.forced ? variable.forcedValue : v?.value }}"{{ variable.suffix }}
  </span>
  <span v-else-if="v?.type === VariableValueType.SMARTACTUATORSINGLECHANNEL">
    <q-icon name="mdi-lightbulb-on-50" /> 
    <label v-if="typeof variable.value === 'object' && v?.value !== null">{{ v?.value.channel }}% {{ v?.value.fadeTime }}s</label>
  </span>
  <span v-else>
    <pre>{{v?.value}}</pre>
  </span>
  <q-btn v-if="variable.forced" flat size="sm" round color="red" @click="unForce(variable)" icon="mdi-lock-open-outline" class="p-pr-lg" />
</label>
</template>

<style scoped></style>
