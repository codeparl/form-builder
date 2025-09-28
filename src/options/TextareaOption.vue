<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import SelectInput from '@/components/inputs/SelectInput.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import TextareaInput from '@/components/inputs/TextareaInput.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

const types = [
  { label: 'Textarea', value: 'textarea' },
  { label: 'Editor', value: 'editor' },
]
// Local reactive state for textarea options
const textareaOptions = reactive({
  rows: model.value?.rows ?? 3,
  maxlength: model.value?.max ?? (null as number | null),
  subType: model.value?.subType ?? model.value?.type,
  value: model.value?.value ?? null,
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      textareaOptions.rows = f.rows ?? 3
      textareaOptions.maxlength = f.max ?? null
      textareaOptions.subType = f.subType ?? f.type
      textareaOptions.value = f.value
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  textareaOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        rows: val.rows,
        max: val.maxlength ?? undefined,
        value: val.value ?? null,
        subType: val.subType ?? model.value.type,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <!-- Type -->
    <div>
      <label class="block text-sm">Type</label>
      <SelectInput v-model="textareaOptions.subType" :options="types" size="small" />
    </div>

    <div>
      <label class="block text-sm">Rows</label>
      <textInput type="number" v-model="textareaOptions.rows" :min="1" size="small" placeholder="Number of rows" />
    </div>

    <!-- Max Length -->
    <div>
      <label class="block text-sm">Max Length</label>
      <textInput
        type="number"
        v-model="textareaOptions.maxlength"
        :min="0"
        size="small"
        placeholder="Enter max length"
      />
    </div>
  </div>
</template>
