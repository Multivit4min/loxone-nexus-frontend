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
    <template v-slot:$zod[selected#Hue]>
      <q-card-section>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="amber" name="mdi-alert" />
          </q-item-section>

          <q-item-section>
            <q-item-label>First Time Setup Instruction</q-item-label>
            <q-item-label caption>
              To setup credentials for this Bridge make sure that the Bridge itself has the main button pressed,
              the light on the bridge should be blue
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </template>
  </ZodDialog>
</template>

<style scoped></style>
