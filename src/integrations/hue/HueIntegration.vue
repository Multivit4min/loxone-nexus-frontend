<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import Tree from "@/components/tree/Tree.vue"
import VariableList from "@/components/variables/VariableList.vue"

const { integration } = defineProps<{ integration: Integration }>()


</script>

<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-lg-8 col-md-12 col-sm-12">
        <q-card flat bordered v-if="integration.specific.bridge">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ integration.specific.bridge.name }}</div>
                <div class="text-subtitle2">Address {{ integration.specific.bridge.ipaddress }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <VariableList
              :instance="integration"
              :disable="['source']"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-lg-4 col-md-12 col-sm-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Hue Entities</div>
          </q-card-section>
          <Tree :integration="integration" dense />
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
