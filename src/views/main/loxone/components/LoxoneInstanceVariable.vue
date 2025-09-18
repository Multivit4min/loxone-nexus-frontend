<script setup lang="ts">
import VariableToolbar from "./VariableToolbar.vue"
import VariableListComponent from "./VariableListComponent.vue"
import type { LoxoneInstance } from "@/api/types/loxone"

const { instance } = defineProps<{ instance: LoxoneInstance }>()
</script>

<template>
  <div>
    <VariableToolbar :instance="instance" />
    <VariableListComponent :instance="instance" />
  </div>
</template>

<style scoped></style>
