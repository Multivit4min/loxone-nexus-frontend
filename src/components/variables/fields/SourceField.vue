<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import type { LoxoneInstance, LoxoneVariable } from "@/api/types/loxone"
import { type VariableTypes } from "@/api/types/variable"
import { useIntegrationStore } from "@/store/integration"
import { useLoxoneStore } from "@/store/loxone"
import { meta } from "@/integrations/config"
import { computed } from "vue"

const integrationStore = useIntegrationStore()
const loxoneStore = useLoxoneStore()
const { variable } = defineProps<{ variable: VariableTypes }>()

const isLoxoneVariable = (v: VariableTypes): v is LoxoneVariable => {
  return "loxoneId" in variable
}

const isLoxoneSource = (source: Integration|LoxoneInstance): source is LoxoneInstance => {
  return "host" in source
}

const source = computed<Integration|LoxoneInstance>(() => {
  if ("integrationId" in variable) {
    return integrationStore.getIntegrationById(variable.integrationId)!
  } else if ("loxoneId" in variable) {
    return loxoneStore.getInstanceById(variable.loxoneId)!
  } else {
    throw new Error(`invalid variable ${JSON.stringify(variable)}`)
  }
})

</script>

<template>
  <RouterLink
    :to="isLoxoneVariable(variable) ? `/loxone/${source.id}` : `/integration/${source.id}`"
    custom
    v-slot="{ navigate }"
  >
    <span @click="navigate" class="text-primary router-span-link">
      <q-icon :name="meta(source.type).icon" v-if="!isLoxoneSource(source)" />
      {{ source.label }}
    </span>
  </RouterLink>
</template>

<style scoped>
  .router-span-link {
    cursor: pointer;
  }
</style>
