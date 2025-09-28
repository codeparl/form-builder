<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import SelectInput from '../inputs/SelectInput.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for the input value
const inputState = reactive({
  selected: model.value?.value ?? '',
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      inputState.selected = f.value ?? ''
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
        value: val.selected,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="w-full">
    <SelectInput
      v-model="inputState.selected"
      :options="model?.options?.map(o => ({ label: o, value: o }))"
      size="small"
      placeholder="Select an option"
    />
  </div>
</template>
