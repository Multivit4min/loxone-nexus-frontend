<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import _ from "lodash"
import { computed, ref } from "vue"
import CreateVariableDialog from "./CreateVariableDialog.vue"

const { integration, path, label, suffix, caption } = defineProps<{
  integration: Integration
  path: string
  label: string
  suffix?: string
  caption?: string
}>()

const open = ref(false)

const value = computed(() => {
  const value = _.get(integration.specific, path)
  if (typeof value === "number") return value.toFixed(2)
  return value
})

const createVariableDialog = () => {
  open.value = true
}

</script>

<template>
  <q-item clickable v-ripple v-if="value !== undefined && value !== null" @click="createVariableDialog">
    <CreateVariableDialog v-if="open" :integration="integration" :path="path" :label="label" v-model="open" />
    <q-item-section avatar >
      <q-icon name="mdi-plus" rounded size="xs" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{label }}</q-item-label>
      <q-item-label caption v-if="caption">{{ caption }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label caption>{{ value }}{{ suffix }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
