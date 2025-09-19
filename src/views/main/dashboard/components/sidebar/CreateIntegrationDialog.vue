<script setup lang="ts">
import { createIntegration } from "@/api/integration"
import ZodDialog from "@/components/zod/ZodDialog.vue"
import { useIntegrationStore } from "@/store/integration"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const integration = useIntegrationStore()
const { config } = storeToRefs(integration)

const form = ref<any>({})
const open = defineModel<boolean>("open", { required: true })

const addIntegration = async () => {
  await createIntegration(form.value)
  open.value = false
}

</script>

<template>
  <ZodDialog
    v-if="config.commonSchema"
    title="Add Integration"
    :zod="config.commonSchema"
    v-model:form="form"
    v-model:open="open"
    selectKey="type"
    @submit="addIntegration()"
  >
    <template v-slot:$zod[HomeAssistant.ws]>
      <q-card-section>
        URL Format:
        <ul>
          <li>with ssl wss://hass.example.com</li>
          <li>without ssl ws://hass.example.com</li>
        </ul>
      </q-card-section>
    </template>
    <template v-slot:$zod[HomeAssistant.token]>
      <q-card-section>
        Create this token via your HomeAssistant Webinterface
        <pre>HomeAssistant Webinterface > [Your Username] > Security > Long-lived access tokens</pre>
      </q-card-section>
    </template>
    <template v-slot:$zod[Sonos.address]>
      <q-card-section>
        IPv4 Address of your Speaker
      </q-card-section>
    </template>
  </ZodDialog>
</template>

<style scoped></style>
