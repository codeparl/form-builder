<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for the input value
const inputState = reactive({
  number: model.value?.value ?? null,
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      inputState.number = f.value ?? null
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  inputState,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        value: val.number,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="w-full">
    <label v-if="model?.label" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ model.label }}
    </label>

    <n-input
      v-model:value="inputState.number"
      :type="model?.subType || 'number'"
      class="w-full"
      size="small"
      :placeholder="model?.placeholder"
      :required="model?.required"
      :min="model?.min"
      :max="model?.max"
      :step="model?.step"
    />
  </div>
</template>
