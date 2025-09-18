<script setup lang="ts">
import { type Integration } from "@/api/integration"
import VariableTree from "./VariableTree.vue"
import IntegrationVariableList from "../common/IntegrationVariableList.vue"

const { integration } = defineProps<{ integration: Integration }>()
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-8 col-sm-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Variables</div>
          <div class="text-subtitle2">data Points which have been added and can be sent to Loxone</div>
        </q-card-section>
        <q-card-section>
          <IntegrationVariableList :integration="integration" :disableFeatures="['create', 'edit']" />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-12">  
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">HomeAssistant Entities</div>
          <div class="text-subtitle2">available entries from HomeAssistant which can be added to the Variable List</div>
        </q-card-section>
        <q-card-section>
          <VariableTree :integration="integration" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped></style>
