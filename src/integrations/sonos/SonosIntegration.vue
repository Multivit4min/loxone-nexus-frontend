<script setup lang="ts">
import type { SonosIntegration } from "@/api/types/integrations/sonos"
import Tree from "@/components/tree/Tree.vue"
import VariableList from "@/components/variables/VariableList.vue"
import InputVolume from "./help/InputVolume.vue";
import SelectedNotification from "./help/SelectedNotification.vue";
import Notification_Uri from "./help/Notification_Uri.vue";

const { integration } = defineProps<{ integration: SonosIntegration }>()


</script>

<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-lg-8 col-md-12 col-sm-12">
        <q-card flat bordered v-if="integration.specific.zone">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">Sonos @{{ integration.specific.zone.IPAddress }}</div>
                <div class="text-subtitle2">Serial Number {{ integration.specific.zone.SerialNumber }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <VariableList
              :instance="integration"
              :disable="['source']"
            >
              <template v-slot:$zod[input#volume]><InputVolume /></template>
              <template v-slot:$zod[selected#notification]><SelectedNotification /></template>
              <template v-slot:$zod[notification.uri]><Notification_Uri /></template>
            </VariableList>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-lg-4 col-md-12 col-sm-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Sonos Entities</div>
          </q-card-section>
          <Tree :integration="integration" dense>
            <template v-slot:$zod[input#volume]><InputVolume /></template>
            <template v-slot:$zod[selected#notification]><SelectedNotification /></template>
            <template v-slot:$zod[notification.uri]><Notification_Uri /></template>
          </Tree>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
