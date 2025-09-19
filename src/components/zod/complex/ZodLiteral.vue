<script setup lang="ts">
import type { ZodAnyOf, ZodObject } from "../type"
import ZodObjectView from "./ZodObject.vue"
import { computed } from "vue"

const model = defineModel<Record<string, any>>({
  required: true
})

const { zod, ignore, selectKey } = defineProps<{
  zod: ZodAnyOf
  ignore?: string[]
  selectKey: string
}>()

const ignoreFields = ignore ? [...ignore, selectKey] : [selectKey]

const options = computed(() => {
  return zod.anyOf.map(entries => {
    if (entries.type !== "object") return console.error(`entries.type ${entries.type} not supported expected object`)
    const entry = entries.properties[selectKey]
    if (!('type' in entry) || entry.type !== "string")
      return console.error(`expected entry.type to be "string" but got ${(entry as any)["type"]}`, entry)
    if (!entry.const) return console.error(`expected entry.const to exist`, entry)
    return {
      label: entry.description || entry.const,
      value: entry.const,
      description: entry.description
    }
  }).filter(e => e)
})

const zodObject = computed<ZodObject|undefined>(() => {
  const value = model.value[selectKey]
  if (!value) return undefined
  return zod.anyOf.find(entries => {
    if (entries.type !== "object") return console.error(`entries.type ${entries.type} not supported expected object`)
    return (
      'type' in entries.properties[selectKey] &&
      entries.properties[selectKey].type === "string" &&
      entries.properties[selectKey].const === value
    )
  }) as ZodObject|undefined
})

</script>

<template>
  <div>
    <q-card-section>
      <q-select
        emit-value
        map-options
        filled
        v-model="model[selectKey]"
        :options="options"
        :label="selectKey"
      />
    </q-card-section>
    <ZodObjectView
      v-if="zodObject"
      :id="model[selectKey]"
      :zod="zodObject"
      :ignore="ignoreFields"
      v-model="model"
    >
      <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </ZodObjectView>
  </div>
</template>

<style scoped></style>
