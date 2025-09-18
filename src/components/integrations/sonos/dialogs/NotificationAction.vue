<script setup lang="ts">
import { useAppStore } from "@/store/app"
import { storeToRefs } from "pinia"

const app = useAppStore()
const { debug } = storeToRefs(app)
const form = defineModel<Record<string, any>>({ required: true })

</script>

<template>
  <q-card style="min-width: 30%">
    <q-card-section>
      <p>Valid uris for playback</p>
      <p><code>https://example.com/sonos/example.mp3</code> play from Web URL</p>
      <p><code>x-file-cifs://127.0.0.1/sonos/example.mp3</code> play from NAS or other Network Storage</p>
      <p>
        Using a string as loxone variable you can set the URL you want to playback,
        if you select a boolean as Linked Loxone Variable you can start it by switching the boolean to true
      </p>
    </q-card-section>
    <q-card-section>
      <q-input
        filled
        type="number"
        v-model.number="form.volume"
        label="Volume"
        hint="Leave empty to use preset Volume"
        :rules="[val => val === undefined || val === '' || (val > 0 && val <= 100) || 'Volume must be >0 and <=100']"
      />
    </q-card-section>
    <q-card-section>
      <q-input
        filled
        v-model="form.uri"
        label="URI"
        hint="Leave empty to provide uri via loxone text"
      />
    </q-card-section>
    <q-card-section v-if="debug">
      <pre>{{ form }}</pre>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
