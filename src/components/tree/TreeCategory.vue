<script setup lang="ts">
import type { TreeCategory } from "./tree.type"

  const { category } = defineProps<{ category: TreeCategory }>()

</script>

<template>
  <label
    :class="{
      [category.class!]: true,
      'text-bold': category.bold
    }"
  >
    {{ category.label }}
  </label>
</template>

<style scoped></style>
