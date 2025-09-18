<script setup lang="ts">
import { useLoxoneStore } from "@/store/loxone"
import router from "@/router"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { useAppStore } from "@/store/app"
import LoxoneInstanceVariable from "./components/LoxoneInstanceVariable.vue"
import LoxoneInstanceState from "./components/LoxoneInstanceState.vue"

const loxone = useLoxoneStore()
const app = useAppStore()
const { debug } = storeToRefs(app)
const { instances, initialized } = storeToRefs(loxone)

const instance = computed(() => {
  return instances.value.find(i => i.id === parseInt(router.currentRoute.value.params.instanceId as any, 10))
})

if (!instance && initialized.value) router.push("/")
</script>

<template>
  <div v-if="instance">
    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-sm-12 col-xs-12">
        <LoxoneInstanceState :instance="instance" />
      </div>

      <div class="col-md-8 col-sm-12 col-xs-12">   
        <LoxoneInstanceVariable :instance="instance" />
      </div>
    </div>
    <div class="row" v-if="debug">
      <div class="col-md-12">
        <pre>{{ instance }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
