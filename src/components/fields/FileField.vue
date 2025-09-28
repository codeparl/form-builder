<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import TextInput from '../inputs/TextInput.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for the input value
const inputState = reactive({
  file: model.value?.value ?? '',
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      inputState.file = f.value ?? ''
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
        value: val.file,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="w-full">
    <TextInput type="file" class="w-full" v-model="inputState.file" placeholder="File path" size="small" />
  </div>
</template>
