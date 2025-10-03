<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import PreviewTopicValue from "./PreviewTopicValue.vue"
import { ref } from "vue";
const { integration } = defineProps<{ integration: Integration }>()

const topics = ref<string[]>([])
const loadTopic = (topic: string) => {
  const index = topics.value.indexOf(topic)
  if (index >= 0) topics.value.slice(index, 1)
  setTimeout(() => topics.value.push(topic), 0)
}

const search = ref("")
</script>

<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">Topics</div>
          <div class="text-subtitle2"><b>{{ integration.specific.topics.length }}</b> topics received</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-input v-model="search" label="Search" />
    </q-card-section>
    <q-card-section> 
      <q-list bordered class="rounded-borders">
        <span v-for="topic in integration.specific.topics">
          <q-expansion-item
            v-if="search === '' || topic.includes(search)"
            expand-separator
            :label="topic"
            @show="loadTopic(topic)"
          >
            <q-card>
              <q-card-section>
                <PreviewTopicValue json :integration="integration" v-if="topics.includes(topic)" :topic="topic"  />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </span>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
