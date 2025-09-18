<script setup lang="ts">
import { useIntegrationStore } from "@/store/integration"
import { useLoxoneStore } from "@/store/loxone"
import DrawerItem from "@/views/main/dashboard/components/sidebar/DrawerItem.vue"
import { storeToRefs } from "pinia"
import { ref } from "vue"
import { meta } from "@/views/main/integration/components/config"
import CreateLoxoneDialog from "./CreateLoxoneDialog.vue"
import CreateIntegrationDialog from "./CreateIntegrationDialog.vue"

const loxone = useLoxoneStore()
const integration = useIntegrationStore()
const { integrations } = storeToRefs(integration)
const { instances } = storeToRefs(loxone)

const open = defineModel<boolean>()
const createLoxoneDialog = ref(false)
const createIntegrationDialog = ref(false)

</script>

<template>
  <q-drawer show-if-above side="left" v-model="open" bordered>
    <q-scroll-area class="fit">
      <q-list padding class="menu-list">

        <q-item dense>
          <q-item-section  no-wrap>
            <q-item-label class="text-weight-bold text-uppercase">
              Loxone Miniservers
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-btn @click="createLoxoneDialog = true" round flat size="sm" icon="mdi-plus" />
            <CreateLoxoneDialog v-model:open="createLoxoneDialog" />
          </q-item-section>
        </q-item>

        <!-- Loxone Miniservers -->
        <DrawerItem
          v-for="instance in instances" 
          :key="instance.id"
          :to="`/loxone/${instance.id}`"
          :label="instance.label"
          :subtitle="`${instance.host}:${instance.port}`"
          :icon="instance.active ? 'mdi-cloud' : 'mdi-cloud-cancel-outline'"
        />

        <q-separator />

        <q-item dense>
          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Integrations
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-btn @click="createIntegrationDialog = true" round flat size="sm" icon="mdi-plus" />
            <CreateIntegrationDialog v-model:open="createIntegrationDialog" />
          </q-item-section>
        </q-item>

        <!-- Integration -->
        <DrawerItem
          v-for="integration in integrations"
          :key="integration.id"
          :to="`/integration/${integration.id}`"
          :label="integration.label"
          :subtitle="meta(integration.type).label"
          :icon="meta(integration.type).icon"
        />

      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped></style>
