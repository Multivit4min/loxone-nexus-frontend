<script setup lang="ts">
import router from "@/router"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { useIntegrationStore } from "@/store/integration"
import IntegrationToolbar from "./components/common/IntegrationToolbar.vue"
import HomeAssistantIntegration from "@/integrations/homeAssistant/HomeAssistantIntegration.vue"
import SonosIntegration from "../../../integrations/sonos/SonosIntegration.vue"
import { useAppStore } from "@/store/app"
import Selector from "@/integrations/selector.vue"

const store = useIntegrationStore()
const { integrations, initialized } = storeToRefs(store)
const app = useAppStore()
const { debug } = storeToRefs(app)

const integration = computed(() => {
  if (!integrations.value) return null
  return integrations.value.find(i => i.id === parseInt(router.currentRoute.value.params.integrationId as any, 10))
})

if (!integration.value && initialized.value) router.push("/")
</script>

<template>
  <div v-if="integration">
    <div class="row q-mb-md">
      <div class="col-xs-12">
        <IntegrationToolbar :integration="integration" />
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-md-12 col-sm-12">
        <Selector :integration="integration" />
      </div>
    </div>
    <pre v-if="debug">{{ integration }}</pre>
  </div>

</template>

<style scoped></style>
