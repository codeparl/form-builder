<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import { NRadioGroup, NRadio } from 'naive-ui'

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
    <n-radio-group v-model:value="inputState.selected" size="small">
      <n-radio v-for="option in model?.options" :key="option" :value="option">{{ option }}</n-radio>
    </n-radio-group>
  </div>
</template>
