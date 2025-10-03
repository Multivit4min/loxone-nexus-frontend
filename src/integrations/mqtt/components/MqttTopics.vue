<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import { ref } from "vue"

const { modelValue, updateModelValue, integration } = defineProps<{
  integration: Integration
  modelValue?: string,
  updateModelValue: (val: string) => void
}>()

const topics = ref<string[]>(integration.specific.topics)
const selector = ref<boolean>(true)
const model = ref<string>(modelValue||"")

const filter = (val: string, update: any) => {
  if (val === "") {
    update(() => {
      topics.value = integration.specific.topics
    })
  } else {
    update(() => {
      topics.value = integration.specific.topics.filter((topic: string) => topic.toLowerCase().includes(val.toLowerCase()) )
    })
  }
}

</script>

<template>
  <span>
    <q-toggle
      v-model="selector"
      :label="selector ? 'select by received topics' : 'manually set topic'"
    />
    <q-input
      v-if="!selector"
      filled
      v-model="model"
      @update:modelValue="() => updateModelValue(model)"
      label="Topic"></q-input>
    <q-select
      v-if="selector"
      filled
      v-model="model"
      @update:modelValue="() => updateModelValue(model)"
      use-input
      input-debounce="0"
      label="Topic"
      :options="topics"
      @filter="filter"
      behavior="menu"
    />
  </span>
</template>

<style scoped></style>
