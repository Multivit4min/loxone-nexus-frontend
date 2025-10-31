<script setup lang="ts">
import type { TreeCategory } from "./tree.type"

  const { category } = defineProps<{ category: TreeCategory }>()

</script>

<template>
  <label
    :class="{
      [category.className!]: true,
      'text-bold': category.bold
    }"
  >
    <q-icon v-if="category.icon" :name="category.icon" />
    {{ category.label }}
    <span v-if="category.comment" class="q-pl-sm text-grey">
      {{ category.comment }}
    </span>
  </label>
</template>

<style scoped></style>
