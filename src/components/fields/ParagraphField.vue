<script setup lang="ts">
import type { FormField } from '@/types/fields'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Watch model → update local state when parent changes
</script>

<template>
  <p>{{ model?.text ?? 'Paragraph' }}</p>
</template>
