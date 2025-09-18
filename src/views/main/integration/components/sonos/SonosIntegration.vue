<script setup lang="ts">
import { type SonosIntegration } from "@/api/integration"
import IntegrationVariableList from "../common/IntegrationVariableList.vue"

const { integration } = defineProps<{ integration: SonosIntegration }>()


</script>

<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-md-12">
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
            <IntegrationVariableList :integration="integration">
              <template v-slot:selected_volume>
                <q-card-section>
                  Use a Analog Input which has a value range from 0 to 100% to set the Volume
                </q-card-section>
              </template>
              <template v-slot:selected_notification>
                <q-card-section>
                  When Loxone Input is:
                  <ul>
                    <li><b>TEXT</b> Set the URI manually via Loxone</li>
                    <li><b>DIGITAL</b> Start the Playback with preset URI on Rising Edge</li>
                  </ul> 
                </q-card-section>
              </template>
              <template v-slot:notification.uri>
                <q-card-section>
                  <div>Valid uris for playback</div>
                  <div><code>https://example.com/sonos/example.mp3</code> play from Web URL</div>
                  <div><code>x-file-cifs://127.0.0.1/sonos/example.mp3</code> play from NAS or other Network Storage</div>
                </q-card-section>
              </template>
            </IntegrationVariableList>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
