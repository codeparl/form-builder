<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import TextInput from '@/components/inputs/TextInput.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Options for <select>
const types = [
  { label: 'Number', value: 'number' },
  { label: 'Range', value: 'range' },
]

// Local reactive state for number options
const numberOptions = reactive({
  numberType: model.value?.subType || 'number',
  min: model.value?.min ?? (null as number | null),
  max: model.value?.max ?? (null as number | null),
  step: model.value?.step ?? (1 as number | null),
})

// Watch model → update local state when parent changes
watch(
  model,
  f => {
    if (f) {
      numberOptions.numberType = f.subType || 'number'
      numberOptions.min = f.min ?? null
      numberOptions.max = f.max ?? null
      numberOptions.step = f.step ?? 1
    }
  },
  { immediate: true }
)

// Watch local state → update model when user edits
watch(
  numberOptions,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        subType: val.numberType,
        min: val.min ?? undefined,
        max: val.max ?? undefined,
        step: val.step ?? undefined,
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
      <n-select v-model:value="numberOptions.numberType" :options="types" size="small" placeholder="Type" />
    </div>

    <!-- Min -->
    <div>
      <label class="block text-sm">Min</label>
      <TextInput type="number" v-model="numberOptions.min" size="small" placeholder="Enter min value" />
    </div>

    <!-- Max -->
    <div>
      <label class="block text-sm">Max</label>
      <TextInput type="number" v-model="numberOptions.max" size="small" placeholder="Enter max value" />
    </div>

    <!-- Step -->
    <div>
      <label class="block text-sm">Step</label>
      <TextInput type="number" v-model="numberOptions.step" size="small" placeholder="Enter step value" />
    </div>
  </div>
</template>
