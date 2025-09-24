<script setup lang="ts">
import { computed, ref } from "vue"
import { getIntegrationTree } from "@/api/integration"
import TreeCategory from "./TreeCategory.vue"
import InputTreeEndpoint from "./InputTreeEndpoint.vue"
import type { Integration } from "@/api/types/integrations"
import OutputTreeEndpoint from "./OutputTreeEndpoint.vue"

  const { integration, dense } = defineProps<{ integration: Integration, dense?: boolean }>()

  const initialized = ref(false)
  const tree = ref([])

  getIntegrationTree(integration.id).then(data => {
    initialized.value = true
    tree.value = data
  })

</script>

<template>
  <q-card-section>
    <q-inner-loading :showing="!initialized" >
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <q-tree
      :nodes="tree"
      node-key="id"
      :dense="dense"
      v-if="initialized"
    >
      <template v-slot:default-header="prop">
        <TreeCategory :category="prop.node" v-if="'children' in prop.node" />
        <InputTreeEndpoint
          :integration="integration"
          :endpoint="prop.node"
          v-else-if="'value' in prop.node && 'config' in prop.node"
        />
        <OutputTreeEndpoint
          :integration="integration"
          :endpoint="prop.node"
          v-else-if="'config' in prop.node"
        />
      </template>
    </q-tree>
  </q-card-section>
</template>

<style scoped></style>
