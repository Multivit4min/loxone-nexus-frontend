<script setup lang="ts">
import { computed, ref } from "vue"

const { modelValue, updateModelValue, events } = defineProps<{
  modelValue?: string[],
  updateModelValue: (val: string[]) => void,
  events: any[]
}>()

const model = ref<string[]>(modelValue||[])

const options = computed<string[]>(() => {
  const options: string[] = []
  events.forEach(ev => {
    if (options.includes(ev.summary)) return
    options.push(ev.summary)
  })
  return options
})

</script>

<template>
  <label>Summaries to use in this event</label>
  <q-list>
    <q-item dense tag="label" v-ripple v-for="summary in options">
      <q-item-section avatar>
        <q-checkbox
          v-model="model"
          @update:modelValue="() => updateModelValue(model)"
          :val="summary"
          color="teal"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{summary}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<style scoped></style>
