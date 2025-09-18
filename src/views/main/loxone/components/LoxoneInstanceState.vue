<script setup lang="ts">
import LoxoneInfoList from "./LoxoneInfoList.vue"
import InstanceStateToolbar from "./InstanceStateToolbar.vue"
import type { LoxoneInstance } from "@/api/loxone"

const { instance } = defineProps<{ instance: LoxoneInstance }>()

</script>

<template>
  <div>
    <InstanceStateToolbar :instance="instance" />
    <LoxoneInfoList :instance="instance" />
  </div>
</template>

<style scoped></style>
