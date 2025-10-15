<script setup lang="ts">
import CalendarIntegration from "./calendar/CalendarIntegration.vue"
import HomeAssistantIntegration from "./homeAssistant/HomeAssistantIntegration.vue"
import HueIntegration from "./hue/HueIntegration.vue"
import SonosIntegration from "./sonos/SonosIntegration.vue"
import type { Integration } from "@/api/types/integrations"
import WebhookIntegration from "./webhook/WebhookIntegration.vue"
import MqttIntegration from "./mqtt/MqttIntegration.vue"
import FroniusIntegration from "./fronius/FroniusIntegration.vue"
import ScriptIntegration from "./script/ScriptIntegration.vue"


const { integration } = defineProps<{ integration: Integration }>()
</script>

<template>

  <HomeAssistantIntegration
    v-if="integration.type === 'HomeAssistant'"
    :integration="integration"
  />
  <SonosIntegration
    v-else-if="integration.type === 'Sonos'"
    :integration="integration"
  />
  <CalendarIntegration
    v-else-if="integration.type === 'Calendar'"
    :integration="integration"
  />
  <HueIntegration
    v-else-if="integration.type === 'Hue'"
    :integration="integration"
  />
  <WebhookIntegration
    v-else-if="integration.type === 'Webhook'"
    :integration="integration"
  />
  <MqttIntegration
    v-else-if="integration.type === 'Mqtt'"
    :integration="integration"
  />
  <FroniusIntegration
    v-else-if="integration.type === 'Fronius'"
    :integration="integration"
  />
  <ScriptIntegration
    v-else-if="integration.type === 'Script'"
    :integration="integration"
  />
  <div v-else>Integration {{ integration.type }} not defined in @/integrations/selector.vue</div>
</template>

<style scoped></style>
