<script setup lang="ts">
import type { FormField } from '@/types/fields'
defineProps<{ field: FormField }>()
</script>

<template>
  <n-input :type="field.type" />
</template>

<style scoped></style>
