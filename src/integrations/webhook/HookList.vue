<script setup lang="ts">
import type { Integration, IntegrationVariable } from "@/api/types/integrations"
import { DateTime } from "luxon"
import { Notify } from "quasar"
import { ref } from "vue"

const { integration } = defineProps<{ integration: Integration }>()
const copied = ref(0)

const getTimeAgo = (date: string) => {
  const dt =DateTime.fromISO(date)
  return dt.toRelative()
}

const copy = async (variable: IntegrationVariable) => {
  copied.value = variable.id
  await navigator.clipboard.writeText(getUrl(variable))
  Notify.create("copied url to clipboard")
}

const getUrl = (variable: IntegrationVariable) => {
  return `${ window.location.origin }/hook/${ integration.id }/${ variable.config.routeName }`
}
</script>

<template>
  <q-card flat bordered>
    <q-card-section>    
      <q-list bordered padding>
        
          <q-item v-for="variable in integration.variables" clickable @click="copy(variable)">

            <q-item-section>
              <q-item-label overline>{{variable.label}}</q-item-label>
              <q-item-label caption>{{ getUrl(variable) }}</q-item-label>
              <q-item-label caption v-if="variable.config.token">Authorization: Bearer {{ variable.config.token }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{ variable.store.count || 0}} calls</q-item-label>
              <q-item-label caption v-show="variable.store.last">{{getTimeAgo(variable.store.last)}}</q-item-label>
            </q-item-section>

          </q-item>


      </q-list>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
