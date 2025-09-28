<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import TextInput from '../inputs/TextInput.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for the input value
const inputState = reactive({
  text: model.value?.value ?? '',
  subType: model.value?.subType ?? 'text',
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      inputState.text = f.value ?? ''
      inputState.subType = f.subType ?? ''
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
    <TextInput
      :type="inputState.subType"
      class="w-full"
      v-model="inputState.text"
      placeholder="Enter default value"
      size="small"
    />
  </div>
</template>
