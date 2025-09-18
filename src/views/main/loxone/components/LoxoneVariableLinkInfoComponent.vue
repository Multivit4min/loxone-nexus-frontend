<script setup lang="ts">
  import { removeLink } from "@/api/link";
import type { LoxoneVariable } from "@/api/loxone"
import { meta } from "@/views/main/integration/components/config";
  import { useIntegrationStore } from "@/store/integration"
import { computed } from "vue";
  import { RouterLink } from "vue-router"

  const integration = useIntegrationStore()

  const { variable } = defineProps<{
    variable: LoxoneVariable
  }>()

  const linked = computed(() => {
    return integration.getVariablesByLinks(variable.links!)
  }) 

</script>

<template>
  <div v-for="link in linked">
    <div v-if="link.integrationVariable">
      <RouterLink :to="`/integration/${link.integrationVariable.integrationId}`" custom v-slot="{ navigate }">
        <span @click="navigate" class="text-primary router-span-link">
          <q-icon :name="meta(link.integrationVariable.integration.type).icon" /> {{link.integrationVariable.integration.label }}
        </span>
      </RouterLink>
      >
      <RouterLink :to="`/integration/${link.integrationVariable.integrationId}#${ link.integrationVariable.label }`" custom v-slot="{ navigate }">
        <span @click="navigate" class="text-primary router-span-link">
          {{ link.integrationVariable.label }}
        </span>
      </RouterLink>
      <q-btn flat size="xs" class="q-ml-sm" round  @click="removeLink(link.id)" icon="mdi-link-off" />
    </div>
  </div>
</template>

<style scoped>
.router-span-link {
  cursor: pointer;
}
</style>
