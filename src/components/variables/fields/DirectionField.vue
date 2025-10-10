<script setup lang="ts">
import { VariableDirection, type VariableTypes } from "@/api/types/variable"
import { computed } from "vue";

const { variable } = defineProps<{ variable: VariableTypes }>()

const isInput = computed(() => variable.direction === VariableDirection.INPUT)

</script>

<template>
  <q-icon
    size="xs"
    :name="isInput ? 'mdi-import' : 'mdi-export'"
    :color="isInput ? 'green' : 'red'"
  />
</template>

<style scoped></style>
