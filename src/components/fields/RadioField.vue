<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import RadionGroup from '../inputs/RadionGroup.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for the input value
const inputState = reactive({
  selected: model.value?.value ?? '',
  options: model.value?.options ?? ['Option 1', 'Option 2', 'Option 3'],
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      inputState.selected = f.value ?? ''
      inputState.options = f.options ?? ['Option 1', 'Option 2', 'Option 3']
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
    <RadionGroup :options="inputState.options" v-model="inputState.selected" size="medium" />
  </div>
</template>
