<script setup lang="ts">
import type { ZodAnyOf, ZodConfig, ZodObject } from "./type"
import ZodObjectView from "./complex/ZodObject.vue"
import ZodLiteralView from "./complex/ZodLiteral.vue"

const model = defineModel<Record<string, any>>({
  required: true
})

const { zod, ignore, selectKey } = defineProps<{
  zod: ZodConfig|ZodObject|ZodAnyOf
  ignore?: string[]
  selectKey?: string
}>()
</script>

<template>
  <div v-if="zod">
    <div v-if="'anyOf' in zod">
      <div v-if="!selectKey">in an AnyOf Schema property 'selectKey' needs to be set</div>
      <div v-else>
        <ZodLiteralView
          :selectKey="selectKey"
          :zod="zod"
          :ignore="ignore"
          v-model="model"
        >
          <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
            <slot :name="name" v-bind="slotProps"></slot>
          </template>
        </ZodLiteralView>
      </div>
    </div>
    <div v-else-if="zod.type === 'object'">
      <ZodObjectView
        :zod="zod"
        :id="selectKey ? model[selectKey] : null"
        v-model="model"
        :ignore="ignore"
      >
        <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
          <slot :name="name" v-bind="slotProps"></slot>
        </template>
      </ZodObjectView>
    </div>
    <div v-else>
      Zod Data Type not implemented
      <pre>{{ zod }}</pre>
    </div>
  </div>
</template>

<style scoped></style>
