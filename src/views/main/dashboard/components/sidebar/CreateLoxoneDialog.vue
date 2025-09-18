<script setup lang="ts">
import { addLoxone } from "@/api/loxone"
import ZodDialog from "@/components/zod/ZodDialog.vue"
import { useLoxoneStore } from "@/store/loxone"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const loxone = useLoxoneStore()
const { instanceSchema } = storeToRefs(loxone)

const form = ref<any>({})

const open = defineModel<boolean>("open", { required: true })

const addMiniserver = async () => {
  await addLoxone(form.value)
  open.value = false
}

</script>

<template>
  <ZodDialog
    v-if="instanceSchema"
    title="Add Loxone Miniserver"
    :zod="instanceSchema"
    v-model:form="form"
    v-model:open="open"
    @submit="addMiniserver()"
  />
</template>

<style scoped></style>
