<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import Tree from "@/components/tree/Tree.vue"
import VariableList from "@/components/variables/VariableList.vue"

const { integration } = defineProps<{ integration: Integration }>()
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-lg-8 col-md-12 col-sm-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Variables</div>
          <div class="text-subtitle2">data Points which have been added and can be sent to Loxone</div>
        </q-card-section>
        <q-card-section>
          <VariableList
            :instance="integration"
            :disable="['source', 'create']"
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-lg-4 col-md-12 col-sm-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">HomeAssistant Entities</div>
          <div class="text-subtitle2">available entries from HomeAssistant which can be added to the Variable List</div>
        </q-card-section>
        <Tree :integration="integration" dense />
      </q-card>
    </div>
  </div>
</template>

<style scoped></style>
