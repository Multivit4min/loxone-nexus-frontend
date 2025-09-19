<script setup lang="ts">
import { type VariableTypes } from "@/api/types/variable"
import { computed } from "vue";

const { variable } = defineProps<{ variable: VariableTypes }>()

const label = computed(() => {
  return variable.label || ("packetId" in variable ? variable.packetId : "")
})

const packetId = computed(() => {
  return "packetId" in variable ? variable.packetId : false
})

</script>

<template>
  <div>
    {{ label }}
    <q-tooltip v-if="packetId">
      <q-icon name="mdi-package-variant-closed" size="sm" /> {{ packetId }}
    </q-tooltip>
  </div>
</template>

<style scoped></style>
