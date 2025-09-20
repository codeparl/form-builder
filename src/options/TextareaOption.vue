<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'

// v-model binding for the field
const model = defineModel<FormField>('value')

const types = [
  { label: 'Textarea', value: 'textarea' },
  { label: 'Editor', value: 'editor' },
]
// Local reactive state for textarea options
const textareaOptions = reactive({
  rows: model.value?.rows ?? 3,
  maxlength: model.value?.max ?? (null as number | null),
  subType: model.value?.subType ?? model.value?.type,
  value: model.value?.value ?? null,
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      textareaOptions.rows = f.rows ?? 3
      textareaOptions.maxlength = f.max ?? null
      textareaOptions.subType = f.subType ?? f.type
      textareaOptions.value = f.value
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  textareaOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        rows: val.rows,
        max: val.maxlength ?? undefined,
        value: val.value ?? null,
        subType: val.subType ?? model.value.type,
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
      <n-select v-model:value="textareaOptions.subType" :options="types" size="small" />
    </div>

    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Rows</label>
      <n-input type="number" v-model:value="textareaOptions.rows" :min="1" size="small" placeholder="Number of rows" />
    </div>

    <!-- Max Length -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Max Length</label>
      <n-input
        type="number"
        v-model:value="textareaOptions.maxlength"
        :min="0"
        size="small"
        placeholder="Enter max length"
      />
    </div>
  </div>
</template>
