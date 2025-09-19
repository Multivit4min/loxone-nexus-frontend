<script setup lang="ts">
import VariableList from "@/components/variables/VariableList.vue"
import { useIntegrationStore } from "@/store/integration"
import { useLoxoneStore } from "@/store/loxone"
import { storeToRefs } from "pinia"
import { computed } from "vue"

const loxoneStore = useLoxoneStore()
const integrationStore = useIntegrationStore()
const { instances } = storeToRefs(loxoneStore)
const { integrations } = storeToRefs(integrationStore)

const entries = computed(() => [...instances.value, ...integrations.value])

</script>

<template>
  <q-card flat bordered>
    <q-card-section v-for="instance in entries">
      <VariableList :instance="instance" />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>