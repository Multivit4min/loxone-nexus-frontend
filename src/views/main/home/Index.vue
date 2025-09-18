<script setup lang="ts">
import GettingStarted from "./components/GettingStarted.vue"
import ReceivingLoxoneVariables from "./components/ReceivingLoxoneVariables.vue"
import SendingLoxoneVariables from "./components/SendingLoxoneVariables.vue";

</script>

<template>
  <div class="q-gutter-md">
    <div class="row q-gutter-md">
      <div class="col">
        <GettingStarted />
      </div>
    </div>
    <div class="row q-gutter-md">
      <div class="col">
        <ReceivingLoxoneVariables />
      </div>
    </div>
    <div class="row q-gutter-md">
      <div class="col">
        <SendingLoxoneVariables />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
