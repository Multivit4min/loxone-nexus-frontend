<script setup lang="ts">
import StringInput from "../primitives/StringInput.vue"
import type { ZodAnyOf } from "../type"
import { computed, ref } from "vue"

const model = defineModel<Record<string, any>>({
  required: true
})

const { zod, id, required } = defineProps<{
  zod: ZodAnyOf
  id: string
  required: boolean
}>()

const inValid = ref<boolean|string>(false)

const patterns = computed(() => {
  const patterns: string[] = []
  zod.anyOf.forEach(e => {
    if (e.type !== "string") {
      inValid.value = `AnyOf only supported for string type`
      return false
    }
    if (e.pattern) patterns.push(e.pattern)
    return true
  })
  return patterns
})

</script>

<template>
  <div>
    <div v-if="inValid">
      {{ inValid }}
    </div>
    <div v-else>
      <StringInput
        :prop="{
          type: 'string',
          description: zod.description,
          default: zod.default
        }"
        :patterns="patterns"
        v-model="model"
        :id="id"
        :required="required"
      />
    </div>
  </div>
</template>

<style scoped></style>
