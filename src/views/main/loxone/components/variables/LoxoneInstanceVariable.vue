<script setup lang="ts">
import VariableToolbar from "./VariableToolbar.vue"
import type { LoxoneInstance } from "@/api/types/loxone"
import VariableList from "@/components/variables/VariableList.vue"

const { instance } = defineProps<{ instance: LoxoneInstance }>()
</script>

<template>
  <div>
    <VariableToolbar :instance="instance" />
    <VariableList :instance="instance" />
  </div>
</template>

<style scoped></style>
