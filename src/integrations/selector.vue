<script setup lang="ts">
import CalendarIntegration from "./calendar/CalendarIntegration.vue"
import HomeAssistantIntegration from "./homeAssistant/HomeAssistantIntegration.vue"
import HueIntegration from "./hue/HueIntegration.vue";
import SonosIntegration from "./sonos/SonosIntegration.vue"
import type { Integration } from "@/api/types/integrations"


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
  <div v-else>Integration {{ integration.type }} not defined in @/integrations/selector.vue</div>
</template>

<style scoped></style>
