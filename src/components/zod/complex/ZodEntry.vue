<script setup lang="ts">
import StringInput from "../primitives/StringInput.vue"
import NumberInput from "../primitives/NumberInput.vue"
import EnumInput from "../primitives/EnumInput.vue"
import type { ZodDataType } from "../type"
import { computed } from "vue"
import ZodAnyOf from "./ZodAnyOf.vue"

const model = defineModel<Record<string, any>>({
  required: true
})

const { zod, ignore, id, required, name } = defineProps<{
  zod: ZodDataType
  name: string
  id?: string
  ignore?: string[]
  required?: string[]
}>()


defineSlots<{
  [key: `$zod[input#${string}]`]: () => void
  [key: `$zod[selected#${string}]`]: () => void
  [key: `$zod[${string}.${string}]`]: (props: { prop: Record<string, any>}) => void
  [key: `$zodCustomInput#${string}.${string}`]: (props: {
    zod: ZodDataType,
    id: string,
    required: boolean
    modelValue: any
    updateModelValue: (value: any) => void
  }) => void
}>()

const isRequired = computed(() => (required||[]).includes(name))
const isIgnored = computed(() => (ignore||[]).includes(name))

</script>

<template>
  <q-card-section v-if="zod && !isIgnored">
    <slot v-if="id" :name="`$zod[input#${name}]`" :prop="zod"></slot>
    <slot v-if="id" :name="`$zod[${id}.${name}]`" :prop="zod"></slot>
    <slot
      v-if="id"
      :name="`$zodCustomInput#${id}.${name}`"
      :zod="zod"
      :id="name"
      :required="isRequired"
      :modelValue="model[name]"
      :updateModelValue="value => model[name] = value"
    >
      <ZodAnyOf
        v-if="'anyOf' in zod"
        :zod="zod"
        :id="name"
        :required="isRequired"
        v-model="model"
      />
      <StringInput
        :required="isRequired"
        v-else-if="zod.type === 'string' && !zod.enum"
        :id="name"
        :prop="zod"
        v-model="model"
      />
      <EnumInput
        :required="isRequired"
        v-else-if="zod.type === 'string' && zod.enum"
        :id="name"
        :prop="zod"
        v-model="model"
      />
      <NumberInput
        :required="isRequired"
        v-else-if="['number', 'integer'].includes(zod.type)"
        :id="name"
        :prop="<any>zod"
        v-model="model"
      />
      <pre v-else>{{ {id: name, required: isRequired, zod} }}</pre>
    </slot>
  </q-card-section>
</template>

<style scoped></style>
