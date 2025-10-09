<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import VariableList from "@/components/variables/VariableList.vue"
import FroniusMeters from "./components/FroniusMeters.vue"
import FroniusStorages from "./components/FroniusStorages.vue"
import FroniusSite from "./components/FroniusSite.vue"
import FroniusOhmpilots from "./components/FroniusOhmpilots.vue"

const { integration } = defineProps<{ integration: Integration }>()

</script>

<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-lg-8 col-md-12 col-sm-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ integration.label }}</div>
                <div class="text-subtitle2">Fronius</div>
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
        <FroniusSite :integration="integration" />
        <FroniusMeters :integration="integration" />
        <FroniusStorages :integration="integration" />
        <FroniusOhmpilots :integration="integration" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
