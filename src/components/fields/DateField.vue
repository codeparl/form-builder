<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import { NInput } from 'naive-ui'

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
    <n-input type="text" class="w-full" v-model:value="inputState.date" placeholder="YYYY-MM-DD" size="small" />
  </div>
</template>
