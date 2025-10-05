<script setup lang="ts">
import type { ZodConfig } from "@/components/zod/type"
import FormConfig from "@/components/zod/FormConfig.vue"


export interface EditIntegrationModel {
  label: string
  config: object
}

const { zod } = defineProps<{
  zod: ZodConfig
}>()

const [model] = defineModel<EditIntegrationModel>({
  required: true,
  set(value) {
    return value
  }
})


</script>

<template>
  <q-form class="q-gutter-md">
    <q-card-section class="q-pt-none">
      <q-input outlined v-model="model.label" label="Label" />
    </q-card-section>
    <FormConfig :zod="zod" v-model="model.config" />
  </q-form>
</template>

<style scoped></style>
