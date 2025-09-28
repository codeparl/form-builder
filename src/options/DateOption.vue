<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import TextInput from '@/components/inputs/TextInput.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for date options
const dateOptions = reactive({
  format: model.value?.format || 'YYYY-MM-DD',
  min: model.value?.min?.toString() || '',
  max: model.value?.max?.toString() || '',
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      dateOptions.format = f.format || 'YYYY-MM-DD'
      dateOptions.min = f.min?.toString() || ''
      dateOptions.max = f.max?.toString() || ''
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  dateOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        format: val.format,
        min: val.min ? Number(val.min) : undefined,
        max: val.max ? Number(val.max) : undefined,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <!-- Format -->
    <div>
      <label class="block text-sm">Format</label>
      <TextInput type="date" v-model="dateOptions.format" size="small" placeholder="YYYY-MM-DD" />
    </div>

    <!-- Min Date -->
    <div>
      <label class="block text-sm">Min Date</label>
      <TextInput type="date" v-model="dateOptions.min" size="small" placeholder="Min date" />
    </div>

    <!-- Max Date -->
    <div>
      <label class="block text-sm">Max Date</label>
      <TextInput type="date" v-model="dateOptions.max" size="small" placeholder="Max date" />
    </div>
  </div>
</template>
