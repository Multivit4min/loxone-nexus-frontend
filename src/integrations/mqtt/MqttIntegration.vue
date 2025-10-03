<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import VariableList from "@/components/variables/VariableList.vue"
import MqttTopics from "./components/MqttTopics.vue"
import PreviewTopicValue from "./components/PreviewTopicValue.vue"
import TopicsOverview from "./components/TopicsOverview.vue";

const { integration } = defineProps<{ integration: Integration }>()


</script>

<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-md-8 col-sm-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">Mqtt</div>
                <div class="text-subtitle2">{{ integration.config.url }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <VariableList
              :instance="integration"
              :disable="['source']"
            >
            <template v-slot:$zodCustomInput#subscribe.topic="{ modelValue, updateModelValue }">
              <MqttTopics
                :model-value="modelValue"
                :updateModelValue="updateModelValue"
                :integration="integration"
              />
            </template>
            <template v-slot:$zodCustomInput#subscribe_json.topic="{ modelValue, updateModelValue }">
              <MqttTopics
                :model-value="modelValue"
                :updateModelValue="updateModelValue"
                :integration="integration"
              />
            </template>
            <template v-slot:$zod[subscribe.topic].after="{ form }">
              <PreviewTopicValue
                :integration="integration"
                :topic="form.topic"
                :json="true"
              />
            </template>
            <template v-slot:$zod[subscribe_json.path].after="{ form }">
              <PreviewTopicValue
                :integration="integration"
                :topic="form.topic"
                :path="form.path"
                :json="true"
              />
            </template>
            </VariableList>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-12">
        <TopicsOverview :integration="integration" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
