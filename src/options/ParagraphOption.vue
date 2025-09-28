<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import TextareaInput from '@/components/inputs/TextareaInput.vue'
import SelectInput from '@/components/inputs/SelectInput.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')
if (model.value) {
  model.value.category = 'hidden'
  model.value.text = 'Paragraph'
}
// Local reactive state for paragraph options
const paragraphOptions = reactive({
  text: model.value?.text ?? '',
  subType: model.value?.subType,
})

const types = [
  { label: 'Paragraph', value: 'paragraph' },
  { label: 'Preformatted', value: 'pre' },
  { label: 'Blockquote', value: 'blockquote' },
  { label: 'Address', value: 'address' },
  { label: 'Output', value: 'output' },
  { label: 'Canvas', value: 'canvas' },
  { label: 'Horizontal Rule', value: 'hr' },
]

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      paragraphOptions.text = f.text || 'Paragraph'
      paragraphOptions.subType = f.subType || 'Paragraph'
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  paragraphOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        text: val.text,
        subType: val.subType,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <!-- Text -->
    <div>
      <label class="block text-sm">Text</label>
      <TextareaInput v-model="paragraphOptions.text" size="small" placeholder="Paragraph text" />
    </div>

    <div>
      <label class="block text-sm">Type</label>
      <SelectInput v-model="paragraphOptions.subType" :options="types" size="small" placeholder="Type" />
    </div>
  </div>
</template>
