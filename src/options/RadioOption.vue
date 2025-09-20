<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import { NInput } from 'naive-ui'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for radio options
const radioOptions = reactive({
  options: (model.value?.options || []).join(','),
  defaultValue: model.value?.defaultValue || '',
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      radioOptions.options = (f.options || []).join(',')
      radioOptions.defaultValue = f.defaultValue || ''
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  radioOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        options: val.options.split(',').map(o => o.trim()),
        defaultValue: val.defaultValue,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <!-- Options -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Options (comma separated)</label>
      <n-input v-model:value="radioOptions.options" size="small" placeholder="Option1, Option2, Option3" />
    </div>

    <!-- Default Value -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Default Value</label>
      <n-input v-model:value="radioOptions.defaultValue" size="small" placeholder="Default selected option" />
    </div>
  </div>
</template>
