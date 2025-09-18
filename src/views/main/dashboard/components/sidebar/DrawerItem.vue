<script setup lang="ts">

import router from "@/router"
import { computed } from "vue"

const props = defineProps<{
  subtitle?: string
  to?: string
  label: string
  icon: string
}>()

const active = computed(() => router.currentRoute.value.path === props.to)

</script>

<template>
  <q-item
    :to="props.to"
    :active="active"
    clickable
    v-ripple
  >
    <q-item-section avatar>
      <q-icon :name="props.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ props.label }}</q-item-label>
      <q-item-label caption v-if="props.subtitle">{{ props.subtitle }}</q-item-label>
    </q-item-section>
  </q-item>
</template>