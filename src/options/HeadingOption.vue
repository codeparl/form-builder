<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FieldCategory, FormField } from '@/types/fields'
import { NInput, NSelect } from 'naive-ui'

// v-model binding for the field
const model = defineModel<FormField>('value')

if (model.value) {
  model.value.category = 'html' as FieldCategory
}

// Local reactive state for heading options
const headingOptions = reactive({
  level: model.value?.level ?? 1,
  text: model.value?.text ?? '',
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      headingOptions.level = f.level ?? 1
      headingOptions.text = f.text ?? ''
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  headingOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        level: val.level,
        text: val.text,
        category: 'html',
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <!-- Level -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Level</label>
      <n-select
        v-model:value="headingOptions.level"
        :options="[
          { label: 'H1', value: 1 },
          { label: 'H2', value: 2 },
          { label: 'H3', value: 3 },
          { label: 'H4', value: 4 },
          { label: 'H5', value: 5 },
          { label: 'H6', value: 6 },
        ]"
        size="small"
      />
    </div>

    <!-- Text -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Text</label>
      <n-input v-model:value="headingOptions.text" size="small" placeholder="Heading text" />
    </div>
  </div>
</template>
