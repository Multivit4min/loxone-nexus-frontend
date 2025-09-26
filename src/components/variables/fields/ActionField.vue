<script setup lang="ts">
import { type VariableTypes } from "@/api/types/variable"
import LinkAction from "./actions/LinkAction.vue"
import DeleteAction from "./actions/DeleteAction.vue"
import EditLoxoneVariableAction from "./actions/EditLoxoneVariableAction.vue"
import EditIntegrationVariableAction from "./actions/EditIntegrationVariableAction.vue"

const { variable, disable } = defineProps<{
  variable: VariableTypes
  disable: ("direction"|"source"|"label"|"type"|"value"|"link"|"actions"|"create"|"action.edit")[]
}>()


</script>

<template>
  <span>
    <LinkAction :variable="variable" />
    <EditLoxoneVariableAction
      v-if="'loxoneId' in variable && !disable.includes('action.edit')"
      :variable="variable"
    />
    <EditIntegrationVariableAction
      v-if="'integrationId' in variable && !disable.includes('action.edit')"
      :variable="variable"
    >
      <template v-for="(slotFn, name) in $slots" v-slot:[name]="slotProps">
        <slot :name="<any>name" v-bind="slotProps"></slot>
      </template>
    </EditIntegrationVariableAction>
    <DeleteAction :variable="variable" />
  </span>
</template>

<style scoped></style>
