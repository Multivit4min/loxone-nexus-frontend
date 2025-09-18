<script setup lang="ts">

defineSlots<{
  sidebar(): void
}>()

const props = defineProps<{
  label: string
  value: string|number|boolean
  clickable?: boolean
}>()

</script>

<template>
<q-item :clickable="props.clickable" v-ripple>
  <q-item-section>
    <q-item-label overline>{{props.label}}</q-item-label>
    <q-item-label>{{props.value}}</q-item-label>
  </q-item-section>
  <q-item-section side>
    <slot name="sidebar"></slot>
  </q-item-section>
</q-item>
</template>

<style scoped></style>
