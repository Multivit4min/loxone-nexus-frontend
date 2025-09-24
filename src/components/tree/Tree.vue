<script setup lang="ts">
import { computed, ref } from "vue"
import type { TreeProps } from "./tree.type"
import type { QTreeNode } from "quasar"
import { getIntegrationTree } from "@/api/integration"
import TreeCategory from "./TreeCategory.vue"
import InputTreeEndpoint from "./InputTreeEndpoint.vue"
import type { Integration } from "@/api/types/integrations"
import OutputTreeEndpoint from "./OutputTreeEndpoint.vue"

  const { integration, dense } = defineProps<{ integration: Integration, dense?: boolean }>()

  const tree = ref<TreeProps>({})

  getIntegrationTree(integration.id).then(data => {
    tree.value = data
  })

  const nodes = computed(() => {
    const { inputs, outputs } = tree.value
    let nodes: QTreeNode[] = []
    if (inputs && inputs.length > 0) nodes.push({
      label: "inputs",
      class: "text-amber",
      bold: true,
      children: inputs
    })
    if (outputs && outputs.length > 0) nodes.push({
      label: "outputs",
      class: "text-amber",
      bold: true,
      children: outputs
    })
    return nodes
  })

</script>

<template>
  <q-tree
    :nodes="nodes"
    node-key="label"
    :dense="dense"
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
</template>

<style scoped></style>
