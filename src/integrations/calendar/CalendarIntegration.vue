<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import Tree from "@/components/tree/Tree.vue"
import VariableList from "@/components/variables/VariableList.vue"
import CalendarCard from "./components/CalendarCard.vue"
import CalendarSummaryEntries from "./components/CalendarSummaryEntries.vue"
import { computed } from "vue"
import VariableEventSelect from "./components/VariableEventSelect.vue"

const { integration } = defineProps<{ integration: Integration }>()

const events = computed(() => integration.specific.events)

</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-8 col-sm-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Variables</div>
          <div class="text-subtitle2">data Points which have been added and can be sent to Loxone</div>
        </q-card-section>
        <q-card-section>
          <VariableList
            :instance="integration"
            :disable="['source']"
          >
            <template v-slot:$zod[event.regex]>
              You can also define a regular expression to filter for events
            </template>
            <template v-slot:$zod[event.regexLocation]>
              Wether the regular expression should search in the title or in the description
            </template>
            <template v-slot:$zodCustomInput#event.summaries="{ modelValue, updateModelValue }">
              <CalendarSummaryEntries
                :model-value="modelValue"
                :updateModelValue="updateModelValue"
                :events="events"
              />
            </template>
            <template v-slot:$zodCustomInput#stop_event.variableId="{ modelValue, updateModelValue }">
              <VariableEventSelect
                :model-value="modelValue"
                :updateModelValue="updateModelValue"
                :variables="integration.variables"
              />
            </template>
          </VariableList>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-12">  
      <div class="row q-col-gutter-md">
        <div class="col-md-12">  
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Calendar Entities</div>
            </q-card-section>
            <Tree :integration="integration" dense>
              <template v-slot:$zodCustomInput#stop_event.variableId="{ modelValue, updateModelValue }">
                <VariableEventSelect
                  :model-value="modelValue"
                  :updateModelValue="updateModelValue"
                  :variables="integration.variables"
                />
              </template>
            </Tree>
          </q-card>
        </div>  
        <div class="col-md-12">  
          <CalendarCard :integration="integration" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
