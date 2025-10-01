<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import VariableList from "@/components/variables/VariableList.vue"
import HookList from "./HookList.vue";

const { integration } = defineProps<{ integration: Integration }>()


</script>

<template>
  <div>
    <div class="row q-col-gutter-md">
    <div class="col-md-8 col-sm-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">Webhook</div>
                <div class="text-subtitle2">Foo</div>
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
      <div class="col-md-4 col-sm-12">
        <HookList :integration="integration" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
