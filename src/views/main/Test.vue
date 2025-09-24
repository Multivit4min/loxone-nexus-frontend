<script setup lang="ts">
import type { TreeProps } from "@/components/tree/tree.type"
import Tree from "@/components/tree/Tree.vue"
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
      <div class="row q-col-gutter-md q-pb-md">
        <div :class="{
          'col-xs-12': !('config' in instance),
          'col-xs-6': 'config' in instance
        }">
          <VariableList :instance="instance" />
        </div>
        <div class="col-xs-6" v-if="'config' in instance">
          <Tree :integration="instance" dense />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>