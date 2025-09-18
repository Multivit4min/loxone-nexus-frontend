<script setup lang="ts">
  import type { IntegrationVariable } from "@/api/integration"
import { removeLink } from "@/api/link"
import { useLoxoneStore } from "@/store/loxone"
import { computed } from "vue"
  import { RouterLink } from "vue-router"

  const loxone = useLoxoneStore()

  const { variable } = defineProps<{
    variable: IntegrationVariable
  }>()

  const linked = computed(() => {
    return loxone.getVariablesByLinks(variable.links!)
  })

</script>

<template>
  <div v-for="link in linked">
    <div v-if="link.loxoneVariable">
      <RouterLink :to="`/loxone/${link.loxoneVariable.instance.id}`" custom v-slot="{ navigate }">
        <span @click="navigate" class="text-primary router-span-link">
          {{link.loxoneVariable.instance.label }}
        </span>
      </RouterLink>
      >
      <RouterLink :to="`/loxone/${link.loxoneVariable.instance.id}#${ link.loxoneVariable.id }`" custom v-slot="{ navigate }">
        <span @click="navigate" class="text-primary router-span-link">
          {{ link.loxoneVariable.label||link.loxoneVariable.packetId }}
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
