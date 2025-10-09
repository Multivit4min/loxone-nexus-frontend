<script setup lang="ts">
import { createVariable } from "@/api/integration"
import { computed, ref } from "vue"
import type { Integration } from "@/api/types/integrations"
import { VariableDirection } from "@/api/types/variable"
import _ from "lodash"

const { integration, label, path } = defineProps<{
  integration: Integration,
  path: string
  label: string
}>()

const open = defineModel<boolean>()
const form = ref<Record<string, any>>({ action: "read", label, path })

export type VariableActionProps = {
  label: string
} & Record<string, any>

const saveAction = async () => {
  if (!form.value) return
  const { label, ...props } = form.value
  await createVariable(integration.id, { label, direction: VariableDirection.INPUT, props })
  open.value = false
}

const value = computed(() => _.get(integration.specific, form.value.path))

</script>

<template>
  <q-dialog v-model="open">
    <q-card style="min-width:40%;max-width:90%;">
      <q-card-section>
        <q-avatar icon="mdi-pencil" />
        <span class="q-ml-sm">Create Variable</span>
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="form.label"
          label="Variable Name"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          :disabled="true"
          v-model="form.path"
          label="Path"
        >
        
        <template v-slot:after>
          <label class="text-caption">{{ value }}</label>
        </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="secondary" v-close-popup />
        <q-btn
          flat
          label="Create"
          color="primary"
          @click="saveAction()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>