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

const isRequired = computed(() => (required||[]).includes(name))
const isIgnored = computed(() => (ignore||[]).includes(name))

const customProps = computed(() => ({
  form: model.value,
  zod,
  id: "name",
  required: isRequired.value
}))

declare type SlotProps = {
  form: Record<string, any>
  zod: ZodDataType,
  id: string
  required: boolean
}

defineSlots<{
  [key: `$zod[input#${string}]`]: (props: SlotProps) => void
  [key: `$zod[selected#${string}]`]: (props: SlotProps) => void
  [key: `$zod[${string}.${string}]`]: (props: SlotProps) => void
  [key: `$zod[${string}.${string}].after`]: (props: SlotProps) => void
  [key: `$zodCustomInput#${string}.${string}`]: (props: {
    form: Record<string, any>
    zod: ZodDataType,
    id: string,
    required: boolean
    modelValue: any
    updateModelValue: (value: any) => void
  }) => void
}>()


</script>

<template>
  <q-card-section v-if="zod && !isIgnored">
    <slot v-if="id" :name="`$zod[input#${name}]`" v-bind="customProps"></slot>
    <slot v-if="id" :name="`$zod[${id}.${name}]`" v-bind="customProps"></slot>
    <slot
      :name="`$zodCustomInput#${id}.${name}`"
      v-bind="customProps"
      :modelValue="model[name]"
      :updateModelValue="value => model[name] = value"
    >
      <span>
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
      </span>
    </slot>
    <slot
      v-if="id"
      :name="`$zod[${id}.${name}].after`"
      v-bind="customProps">
    </slot>
  </q-card-section>
</template>

<style scoped></style>
