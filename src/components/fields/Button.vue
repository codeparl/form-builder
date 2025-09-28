<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for button properties
const buttonState = reactive({
  label: model.value?.label || 'Click Me',
  type: model.value?.subType || 'primary',
  style: model.value?.buttonStyle ?? 'default',
  size: model.value?.size || 'medium',
})

// Watch parent model → update local state
watch(
  model,
  f => {
    if (f) {
      buttonState.label = f.label || 'Click Me'
      buttonState.type = f.subType || 'primary'
      buttonState.size = f.size || 'medium'
      buttonState.style = f.buttonStyle || 'default'
    }
  },
  { immediate: true }
)

// Watch local state → update parent model
watch(
  buttonState,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        label: val.label,
        subType: val.type,
        size: val.size,
        buttonStyle: val.style,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <ButtonInput :type="buttonState.style" :is-outline="true" :size="buttonState.size">
    {{ buttonState.label }}
  </ButtonInput>
</template>
