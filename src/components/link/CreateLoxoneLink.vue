<script setup lang="ts">
import { createLink } from "@/api/link"
import { useLoxoneStore } from "@/store/loxone"
import { computed } from "vue"
import VariableListSimple from "../../views/main/loxone/components/variables/VariableListSimple.vue"
import { useAppStore } from "@/store/app"
import { storeToRefs } from "pinia"
import type { IntegrationVariable } from "@/api/types/integrations"
import { VariableDirection } from "@/api/types/variable"
import type { LoxoneVariable } from "@/api/types/loxone"

const app = useAppStore()
const { debug } = storeToRefs(app)
const { integrationVariable } = defineProps<{ integrationVariable: IntegrationVariable|undefined }>()
const open = defineModel<boolean>("open")
const loxone = useLoxoneStore()

const vars = computed(() => {
  if (!integrationVariable) return []
  const dir = integrationVariable.direction === VariableDirection.INPUT ? VariableDirection.OUTPUT : VariableDirection.INPUT
  return loxone.getVariableLinks(dir)
})

const setVariable = async (variable: LoxoneVariable) => {
  if (!integrationVariable) return
  await createLink({
    integrationVariable: integrationVariable.id,
    loxoneVariable: variable.id
  })
  open.value = false
}

</script>

<template>
  <q-dialog v-model="open">
    <q-card  style="min-width: 30%">
      <q-card-section>
        <q-avatar icon="mdi-pencil" />
        <span class="q-ml-sm">Link {{ integrationVariable?.label }}</span>
      </q-card-section>
      <q-card-section>
        <VariableListSimple :variables="vars" :ignore-fields="['direction', 'link']">
          <template v-slot:actions="props">
            <q-btn flat size="sm" round color="blue" @click="setVariable(props.variable)" icon="mdi-link-plus" class="p-pr-lg" />
          </template>
        </VariableListSimple>
      </q-card-section>
      <q-card-section v-if="debug">
        <pre>{{ vars }}</pre>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
