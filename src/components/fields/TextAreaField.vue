<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for the textarea value
const inputState = reactive({
  text: model.value?.value ?? '',
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      inputState.text = f.value ?? ''
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
        value: val.text,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="w-full">
    <n-input
      type="textarea"
      class="!w-full"
      v-model:value="inputState.text"
      :rows="model?.rows || 3"
      placeholder="Enter text..."
    />
  </div>
</template>
