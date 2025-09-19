<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import { NButton } from 'naive-ui'
import type { Type as ButtonType, Size as ButtonSize } from 'naive-ui/es/button/src/interface'
// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for button properties
const buttonState = reactive({
  label: model.value?.label || 'Click Me',
  type: model.value?.subType || 'primary',
  style: (model.value?.style as ButtonType) || 'primary',
  size: (model.value?.size as ButtonSize) || 'medium', // naive-ui sizes: tiny, small, medium, large
})

// Watch parent model → update local state
watch(
  model,
  f => {
    if (f) {
      buttonState.label = f.label || 'Click Me'
      buttonState.type = f.subType || 'primary'
      buttonState.size = f.size || 'medium'
      buttonState.style = (f.style as ButtonType) || 'primary'
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
        style: val.style,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <n-button :type="buttonState.style as ButtonType" :size="buttonState.size as ButtonSize">
    {{ buttonState.label }}
  </n-button>
</template>
