<script setup lang="ts">
import type { ZodString } from "../type"

const model = defineModel<Record<string, any>>({ required: true })

const { prop, id } = defineProps<{
  readonly required: boolean
  readonly id: string
  readonly prop: ZodString
}>()

</script>

<template>
  <div>
    <q-select
      emit-value
      map-options
      filled
      v-model="model[id]"
      :options="prop.enum!"
      :label="id"
      :hint="prop.description"
    />
  </div>
</template>

<style scoped></style>
