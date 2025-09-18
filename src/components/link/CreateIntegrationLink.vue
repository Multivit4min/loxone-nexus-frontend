<script setup lang="ts">
import { createLink } from "@/api/link"
import { computed } from "vue"
import { VariableDirection, type LoxoneVariable } from "@/api/loxone"
import { useAppStore } from "@/store/app"
import { storeToRefs } from "pinia"
import type { IntegrationVariable } from "@/api/integration"
import { useIntegrationStore } from "@/store/integration"
import VariableList from "../VariableList.vue"

const app = useAppStore()
const { debug } = storeToRefs(app)
const { loxoneVariable } = defineProps<{
  loxoneVariable: LoxoneVariable|undefined }>()
const open = defineModel<boolean>("open")
const integration = useIntegrationStore()

const vars = computed(() => {
  if (!loxoneVariable) return []
  const dir = loxoneVariable.direction === VariableDirection.INPUT ? VariableDirection.OUTPUT : VariableDirection.INPUT
  return integration.getVariableLinks(dir)
})


const setVariable = async (variable: IntegrationVariable) => {
  if (!loxoneVariable) return
  await createLink({
    integrationVariable: variable.id,
    loxoneVariable: loxoneVariable.id
  })
  open.value = false
}

</script>

<template>
  <q-dialog v-model="open">
    <q-card  style="min-width: 30%" v-if="loxoneVariable">
      <q-card-section>
        <q-avatar icon="mdi-pencil" />
        <span class="q-ml-sm">Link {{ loxoneVariable.label }}</span>
      </q-card-section>
      <q-card-section>
        <VariableList :variables="vars" :ignore-fields="['direction', 'link']">
          <template v-slot:actions="props">
            <q-btn flat size="sm" round color="blue" @click="setVariable(props.variable)" icon="mdi-link-plus" class="p-pr-lg" />
          </template>
        </VariableList>
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
