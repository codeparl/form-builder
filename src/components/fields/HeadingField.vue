<script setup lang="ts">
import type { FormField } from '@/types/fields'

// v-model binding for the field
const model = defineModel<FormField>('value')
</script>

<template>
  <component :is="`h${model?.level || 1}`">{{ model?.text ?? 'Heading' }}</component>
</template>
