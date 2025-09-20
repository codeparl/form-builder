<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'

// v-model binding
const model = defineModel<FormField>('value')
if (model.value) model.value.category = 'hidden'
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm"></div>
</template>
