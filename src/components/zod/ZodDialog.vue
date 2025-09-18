<script setup lang="ts">
import { useAppStore } from "@/store/app";
import FormConfig from "./FormConfig.vue"
import type { ZodAnyOf, ZodConfig, ZodObject } from "./type"
import { storeToRefs } from "pinia";

const { title, zod, ignore, selectKey } = defineProps<{
  title?: string
  zod: ZodConfig|ZodObject|ZodAnyOf
  ignore?: string[]
  selectKey?: string
}>()
const form = defineModel<Record<string, any>>("form", { required: true })
const open = defineModel<boolean>("open", { required: true })
const emit = defineEmits<{ (e: "submit"): void, (e: "cancel"): void }>()

const store = useAppStore()
const { debug } = storeToRefs(store)

</script>

<template>
  <q-dialog v-model="open">
    <q-card flat bordered style="width: 700px; max-width: 80vw;">
      <q-form
        @submit="emit('submit')"
        @reset="emit('cancel')"
        class="q-gutter-md"
      >
        <q-card-section v-if="title">
          <div class="text-h6">{{ title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <FormConfig
            v-model="form"
            :zod="zod"
            :ignore="ignore"
            :selectKey="selectKey"
          >
            <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
              <slot :name="name" v-bind="slotProps"></slot>
            </template>
          </FormConfig>
          <q-card-actions align="right">
            <q-btn label="Cancel" color="secondary" v-close-popup/>
            <q-btn label="Submit" type="submit" color="primary" />
          </q-card-actions>
        </q-card-section>
        <q-card-section v-if="debug">
          <pre>{{ form }}</pre>
          <pre>{{ zod }}</pre>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
