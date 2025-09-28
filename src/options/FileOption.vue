<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import TextInput from '@/components/inputs/TextInput.vue'
import CheckboxInput from '@/components/inputs/CheckboxInput.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for file options
const fileOptions = reactive({
  accept: model.value?.accept || '',
  multiple: model.value?.multiple || false,
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      fileOptions.accept = f.accept || ''
      fileOptions.multiple = f.multiple || false
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  fileOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        accept: val.accept,
        multiple: val.multiple,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <!-- Accept -->
    <div>
      <label class="block text-sm">Accept</label>
      <TextInput type="file" v-model="fileOptions.accept" size="small" placeholder="image/*, .pdf" />
    </div>

    <!-- Multiple -->
    <div>
      <label class="block text-sm">Multiple</label>
      <CheckboxInput v-model:checked="fileOptions.multiple" size="small" />
    </div>
  </div>
</template>
