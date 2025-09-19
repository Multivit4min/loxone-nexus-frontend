<script setup lang="ts">
import { createLink } from "@/api/link"
import { VariableDirection, type VariableTypes } from "@/api/types/variable"
import VariableList from "@/components/variables/VariableList.vue"
import { useIntegrationStore } from "@/store/integration"
import { useLoxoneStore } from "@/store/loxone"
import { ref } from "vue"

const { variable } = defineProps<{ variable: VariableTypes }>()

const loxoneStore = useLoxoneStore()
const integrationStore = useIntegrationStore()

const openDialog = ref(false)
const linkable = ref<VariableTypes[]>([])
const openLinkDialog = (v: VariableTypes) => {
  linkable.value = (() => {
    const direction = variable.direction === VariableDirection.INPUT ? VariableDirection.OUTPUT : VariableDirection.INPUT
    if ('loxoneId' in variable) return integrationStore.getVariableLinks(direction) as VariableTypes[]
    if ('integrationId' in variable) return loxoneStore.getVariableLinks(direction) as VariableTypes[]
    return [] as VariableTypes[]
  })()
  openDialog.value = true
}

const linkWith = async (v: VariableTypes) => {
  await createLink({
    integrationVariable: 'integrationId' in variable ? variable.id : v.id,
    loxoneVariable: 'loxoneId' in variable ? variable.id : v.id
  })
  openDialog.value = false
}

</script>

<template>
  <q-btn
    flat
    size="sm"
    round
    color="blue"
    @click="openLinkDialog(variable)"
    icon="mdi-link"
    :disable="variable.direction !== VariableDirection.INPUT && variable.links?.length > 0"
  />
  <q-dialog v-model="openDialog">
    <q-card  style="min-width: 30%">
      <q-card-section>
        <q-avatar icon="mdi-pencil" />
        <span class="q-ml-sm">Link {{ variable.label }}</span>
      </q-card-section>
      <q-card-section>
        <VariableList
          :instance="{ variables: linkable }"
          :disable="['direction', 'link', 'create']"
        >
          <template v-slot:actions="props">
            <q-btn flat size="sm" round color="blue" @click="linkWith(props.variable)" icon="mdi-link-plus" class="p-pr-lg" />
          </template>
        </VariableList>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
