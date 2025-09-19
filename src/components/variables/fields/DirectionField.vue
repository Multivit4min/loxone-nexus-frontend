<script setup lang="ts">
import { VariableDirection, type VariableTypes } from "@/api/types/variable"

const { variable } = defineProps<{ variable: VariableTypes }>()


</script>

<template>
  <div>
    <label v-if="variable.direction === VariableDirection.INPUT">IN</label>
    <label v-if="variable.direction === VariableDirection.OUTPUT">OUT</label>
  </div>
</template>

<style scoped></style>
