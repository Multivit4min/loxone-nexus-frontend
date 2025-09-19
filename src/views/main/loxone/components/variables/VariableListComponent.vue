<script setup lang="ts">
import { ref } from "vue"
import { deleteVariable, updateVariable, forceVariable } from "@/api/loxone"
import VariableListSimple from "./VariableListSimple.vue"
import CreateIntegrationLink from "@/components/link/CreateIntegrationLink.vue"
import { LoxoneVariableType, type LoxoneInstance, type LoxoneVariable } from "@/api/types/loxone"
import { VariableDirection } from "@/api/types/variable"

const { instance } = defineProps<{ instance: LoxoneInstance }>()

type ModifyVariableProps = {
  variable: null|LoxoneVariable
  open: boolean
}
const editVar = ref<ModifyVariableProps>({ variable: null, open: false })

const modifyVar = (variable: LoxoneVariable) => {
  editVar.value = { variable: { ...variable }, open: true }
}

const saveVariable = async () => {
  const { variable } = editVar.value
  if (!variable || !instance) return
  await updateVariable({
    instanceId: instance.id,
    variableId: variable.id,
    label: variable.label,
    suffix: variable.suffix
  })
  editVar.value.open = false
}


const forceDialog = ref(false)
const forcedVariable = ref<null|LoxoneVariable>(null)
const forcedValue = ref<any>(null)
const forceVar = (variable: LoxoneVariable) => {
  forcedVariable.value = variable
  forceDialog.value = true
  forcedValue.value = variable.forcedValue || variable.value
}
const setForce = () => {
  if (!forcedVariable.value) return
  forceVariable({ instanceId: instance.id, variableId: forcedVariable.value.id, value: forcedValue.value })
}

const linkDialog = ref(false)
const variable = ref<LoxoneVariable|undefined>()
const openLinkDialog = (v: LoxoneVariable) => {
  variable.value = v
  linkDialog.value = true
}
</script>

<template>
  <q-card flat bordered>
    <VariableListSimple :variables="instance.variables">
      <template v-slot:actions="{ variable }">
        <q-btn flat size="sm" round color="blue" @click="openLinkDialog(variable)" icon="mdi-link" v-show="variable.direction === VariableDirection.INPUT || variable.links?.length === 0" />
        <q-btn flat size="sm" round color="blue" @click="forceVar(variable)" icon="mdi-lock-outline" class="p-pr-lg" />
        <q-btn flat size="sm" round color="orange" @click="modifyVar(variable)" icon="mdi-pencil" class="p-pr-lg" />
        <q-btn flat size="sm" round color="red" @click="deleteVariable(variable.loxoneId, variable.id)" icon="mdi-delete" />
      
        <!-- Variable Force Options -->
        <q-dialog v-model="forceDialog">
          <q-card style="min-width: 40%">
            <q-card-section>
              <div class="text-h6">Force Variable {{ forcedVariable!.label || forcedVariable!.packetId }}</div>
            </q-card-section>
            <q-card-section v-if="forcedVariable!.type === LoxoneVariableType.DIGITAL">
              <q-toggle
                v-model="forcedValue"
                color="green"
                :label="forcedValue ? 'true' : 'false'"
              />
            </q-card-section>
            <q-card-section v-else-if="forcedVariable!.type === LoxoneVariableType.ANALOG">
              <q-input outlined v-model="forcedValue" label="force to" type="number" />
            </q-card-section>
            <q-card-section v-else>
              Type {{ forcedVariable!.type }} not implemented to be forced
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="Cancel" />
              <q-btn v-close-popup color="primary" @click="setForce()" label="Force" />
            </q-card-actions>
          </q-card>
        </q-dialog>

          <!-- Modify Input Variable -->
          <q-dialog v-model="editVar.open">
            <q-card style="min-width: 300px;">
              <q-card-section>
                <div class="text-h6">{{ editVar.variable!.packetId }}</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <q-input outlined v-model="editVar.variable!.label" label="Label" />
              </q-card-section>
              <q-card-section class="q-pt-none">
                <q-input outlined v-model="editVar.variable!.suffix" label="Suffix" />
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Save" color="primary" @click="saveVariable()" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
      </template>
    </VariableListSimple>
    <CreateIntegrationLink :loxone-variable="variable!" v-model:open="linkDialog" />
  </q-card>
</template>

<style scoped></style>