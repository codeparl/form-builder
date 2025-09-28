<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for the input value
const inputState = reactive({
  checked: model.value?.value ?? false,
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      inputState.checked = f.value ?? false
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
        value: val.checked,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="w-full"></div>
</template>
