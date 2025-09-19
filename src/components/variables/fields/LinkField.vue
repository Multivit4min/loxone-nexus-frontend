<script setup lang="ts">
  import { removeLink } from "@/api/link"
import { meta } from "@/views/main/integration/components/config"
  import { useIntegrationStore } from "@/store/integration"
import { computed } from "vue"
  import { RouterLink } from "vue-router"
import type { VariableTypes } from "@/api/types/variable"
import { useLoxoneStore } from "@/store/loxone"

  const integration = useIntegrationStore()
  const loxone = useLoxoneStore()

  const { variable } = defineProps<{
    variable: VariableTypes
  }>()

  const linked = computed(() => {
    if ("loxoneId" in variable) {
      return integration.getVariablesByLinks(variable.links).map(v => ({
        id: v.id,
        label: v.integrationVariable?.label,
        icon: meta(v.integrationVariable?.integration.type!).icon,
        link: `/loxone/${variable.loxoneId}`,
        source: v.integrationVariable?.integration.label,
        hash: v.integrationVariable?.label
      }))
    } else {
      return loxone.getVariablesByLinks(variable.links).map(v => ({
        id: v.id,
        label: v.loxoneVariable?.label || v.loxoneVariable?.packetId,
        link: `/integration/${variable.integrationId}`,
        source: v.loxoneVariable?.instance.label,
        hash: v.loxoneVariable?.label
      }))
    }
  })



</script>

<template>
  <div v-for="link in linked">
    <RouterLink :to="link.link" custom v-slot="{ navigate }">
      <span @click="navigate" class="text-primary router-span-link">
        <q-icon
          v-if="'icon' in link"
          :name="<string>link.icon"
          /> {{link.source }}
      </span>
    </RouterLink>
    >
    <RouterLink :to="`${link.link}#${ link.hash }`" custom v-slot="{ navigate }">
      <span @click="navigate" class="text-primary router-span-link">
        {{ link.label }}
      </span>
    </RouterLink>
    <q-btn flat size="xs" class="q-ml-sm" round  @click="removeLink(link.id)" icon="mdi-link-off" />
  </div>
</template>

<style scoped>
.router-span-link {
  cursor: pointer;
}
</style>
