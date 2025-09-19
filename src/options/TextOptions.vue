<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Options for <select>
const types = [
  { label: 'Text Field', value: 'text' },
  { label: 'Email', value: 'email' },
  { label: 'Password', value: 'password' },
  { label: 'Color', value: 'color' },
  { label: 'URL', value: 'url' },
]

// Local reactive state for text options
const textOptions = reactive({
  textType: model.value?.subType || model.value?.type || 'text',
  maxlength: model.value?.max ?? (null as number | null),
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      textOptions.textType = f.subType || f.type || 'text'
      textOptions.maxlength = f.max ?? null
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  textOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        subType: val.textType,
        max: val.maxlength ?? undefined,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <!-- Type -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Type</label>
      <n-select v-model:value="textOptions.textType" :options="types" size="small" placeholder="Type" />
    </div>

    <!-- Max Length -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Max Length</label>
      <n-input
        type="number"
        v-model:value="textOptions.maxlength"
        :min="0"
        size="small"
        placeholder="Enter max length"
      />
    </div>
  </div>
</template>
