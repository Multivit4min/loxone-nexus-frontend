<script setup lang="ts">
import type { ZodObject } from "../type"
import ZodEntry from "./ZodEntry.vue"

const model = defineModel<Record<string, any>>({
  required: true
})

const { zod, ignore, id } = defineProps<{
  zod: ZodObject
  ignore?: string[]
  id?: string
}>()

</script>

<template>
  <div>
    <slot v-if="id" :name="`$zod[selected#${id}]`"></slot>
    <div v-for="(prop, key) in zod.properties">
      <ZodEntry
        :ignore="ignore"
        :id="id"
        :name="key"
        :zod="prop"
        :required="zod.required"
        v-model="model"
      >
        <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
          <slot :name="<any>name" v-bind="slotProps"></slot>
        </template>
      </ZodEntry>
    </div>
  </div>
</template>

<style scoped></style>
