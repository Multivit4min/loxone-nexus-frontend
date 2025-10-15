<script setup lang="ts">
import type { Integration } from "@/api/types/integrations"
import VariableList from "@/components/variables/VariableList.vue"
import { computed, ref, watch } from "vue"

import { PrismEditor } from "vue-prism-editor"
import "vue-prism-editor/dist/prismeditor.min.css"
//@ts-ignore
import { highlight, languages } from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism-tomorrow.css"
import { customIntegrationRoute } from "@/api/integration"
import { Notify } from "quasar"
import { helpSnippet } from "./help"

const { integration } = defineProps<{ integration: Integration }>()

const code = ref("")

watch(() => integration.id,
  () => code.value = integration.specific.code ?? "",
  { immediate: true }
)

const highlighter = (code: any) => highlight(code, languages.js)

const save = async () => {
  await customIntegrationRoute(integration.id, "/code").patch({ code: code.value })
  Notify.create("saved")
}

const start = async () => {
  await customIntegrationRoute(integration.id, "/start").patch({})
}

const stop = async () => {
  await customIntegrationRoute(integration.id, "/stop").patch({})
}

const diff = computed(() => code.value !== integration.specific.code)
const openHelp = ref()

</script>

<template>
  <div class="row q-pb-md">
  <q-dialog v-model="openHelp">
    <q-card style="min-width:40%;max-width: 90%;">
      <q-card-section>
        <q-avatar icon="mdi-help" />
        <span class="q-ml-sm">Help</span>
      </q-card-section>
      <q-card-section>
        To set specific inputs or read outputs use the global variable <code class="text-red">nexus</code> for example
      </q-card-section>
      <q-card-section>
        <PrismEditor
          class="editor"
          readonly
          v-model="helpSnippet"
          :highlight="highlighter"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
    <div class="col-lg-12 col-md-12 col-sm-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Variables</div>
          <div class="text-subtitle2">data Points which have been added and can be sent to Loxone</div>
        </q-card-section>
        <q-card-section>
          <VariableList :instance="integration" :disable="['source']" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row q-pb-md">
    <div class="col-md-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="row">
            <div class="col-md-6">
              <div class="text-h6">
                Script
               <q-btn class="q-ml-sm" icon="mdi-help" round size="xs" @click="openHelp = true" />
              </div>
            </div>
            <div class="col-md-6">
              <q-btn
                :icon="diff ? 'mdi-content-save-outline' : undefined"
                label="Save"
                :color="diff ? 'orange':'green'"
                @click="save()"
                class="on-right float-right"
              />
              <q-btn
                icon="mdi-play"
                color="red" v-if="['NOT_INITIALIZED', 'STOPPED'].includes(integration.specific.state)"
                @click="start"
                class="float-right"
              />
              <q-btn icon="mdi-alert" color="orange" v-else-if="integration.specific.state === 'INIT'" disable class="float-right"></q-btn>
              <q-btn icon="mdi-pause" color="orange" v-else-if="integration.specific.state === 'RUNNING'" @click="stop" class="float-right"></q-btn>
              <q-btn icon="mdi-question" color="orange" class="float-right" v-else></q-btn>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <PrismEditor
            class="editor height-300"
            v-model="code"
            line-numbers
            :highlight="highlighter"
            @keydown.ctrl.s.prevent="save"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row q-col-gutter-md q-pb-md">
    <div class="col-md-12">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Logs</div>
        </q-card-section>
        <q-card-section>
          <div
            class="log"
            v-for="{ level, date, msg } in integration.specific.log"
            :class="{ 'text-red': level === 'error', 'text-orange': level === 'warn' }"
          >
            {{ msg.join(", ") }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
  .editor {
    background: #2d2d2d;
    color: #ccc;

    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }
  :deep(.prism-editor__textarea:focus) {
    outline: none;
  }

  .height-300 {
    min-height: 300px;
  }

  .log {
    margin-bottom: 0.5em;
    white-space: pre-wrap;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  }
</style>
