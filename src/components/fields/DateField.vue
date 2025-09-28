<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import TextInput from '../inputs/TextInput.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for the input value
const inputState = reactive({
  date: model.value?.value ?? '',
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      inputState.date = f.value ?? ''
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
        value: val.date,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="w-full">
    <TextInput type="date" class="w-full" v-model="inputState.date" placeholder="YYYY-MM-DD" size="small" />
  </div>
</template>
