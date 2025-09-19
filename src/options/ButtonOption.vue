<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import { NInput, NSelect } from 'naive-ui'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for button options
const buttonOptions = reactive({
  value: model.value?.value || null,
  type: model.value?.subType || 'primary',
  size: model.value?.size || 'medium',
  style: model.value?.style || '',
})

const types = [
  { label: 'Button', value: 'button' },
  { label: 'Submit', value: 'submit' },
  { label: 'Reset', value: 'reset' },
]

const buttonStyle = [
  { label: 'Primary', value: 'primary' },
  { label: 'Info', value: 'info' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Default', value: 'default' },
]

// Watch parent model → update local state
watch(
  model,
  f => {
    if (f) {
      buttonOptions.value = f.value || f.subType
      buttonOptions.type = f.subType || 'button'
      buttonOptions.size = f.size || 'medium'
      buttonOptions.style = f.style || 'primary'
    }
  },
  { immediate: true }
)

// Watch local state → update parent model
watch(
  buttonOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        value: val.value,
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
  <div class="space-y-3 w-full max-w-sm p-2">
    <!-- Label -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Value</label>
      <n-input v-model:value="buttonOptions.value" placeholder="Button text" size="small" />
    </div>

    <!-- Type -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Type</label>
      <n-select v-model:value="buttonOptions.type" :options="types" size="small" />
    </div>

    <!-- Size -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Size</label>
      <n-select
        v-model:value="buttonOptions.size"
        :options="[
          { label: 'Tiny', value: 'tiny' },
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ]"
        size="small"
      />
    </div>
    <!-- Size -->
    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Button Style</label>
      <n-select v-model:value="buttonOptions.style" :options="buttonStyle" size="small" />
    </div>
  </div>
</template>
