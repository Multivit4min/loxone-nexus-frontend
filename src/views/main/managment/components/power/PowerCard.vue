<script setup lang="ts">
import { restartApplication } from "@/api/power"

</script>

<template>
  <q-card flat bordered>
    <q-card-section>
      <q-btn
        icon="mdi-restart"
        label="Restart Application"
        color="primary"
        @click="restartApplication()"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>