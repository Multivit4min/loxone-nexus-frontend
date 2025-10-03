<script setup lang="ts">
import { customIntegrationRoute } from "@/api/integration"
import type { Integration } from "@/api/types/integrations"
import { ref, watch } from "vue"
import _ from "lodash"

const { topic, integration, json } = defineProps<{
  integration: Integration
  topic?: string
  json?: boolean
  path?: string
}>()

const topicValue = ref<any>({})

const updateTopicValue = async (topic?: string) => {
  if (topic === undefined || topic.trim() === "") return topicValue.value = {}
  topicValue.value = await customIntegrationRoute(integration.id, `topic/${encodeURIComponent(topic)}`).get()
}

const getPath = (path: string, data: any) => {
  const value = _.get(data, path)
  if (value !== undefined) return value
  const actual = path.split(".")
  actual.pop()
  if (actual.length === 0) return data
  return _.get(data, actual.join("."))
}

watch(() => topic, topic => updateTopicValue(topic))
updateTopicValue(topic)

</script>

<template>
    <pre
      class="bg-grey-9"
      style="padding:10px;height: 20pc; overflow-y: scroll;"
      v-if="topicValue"
    >{{ json ? getPath(path||"", topicValue) : JSON.stringify(topicValue) }}</pre>
</template>

<style scoped></style>
