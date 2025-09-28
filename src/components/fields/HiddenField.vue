<script setup lang="ts">
import { watch, reactive } from 'vue'
import type { FormField } from '@/types/fields'

// v-model binding
const model = defineModel<FormField>('value')
if (model.value) model.value.category = 'html'
// Local state for hidden field value
const inputState = reactive({
  hidden: model.value?.value ?? '',
})

// Sync parent → local
watch(
  model,
  f => {
    if (f) {
      inputState.hidden = f.value ?? ''
    }
  },
  { immediate: true }
)

// Sync local → parent
watch(
  inputState,
  val => {
    if (model.value) {
      model.value = {
        ...model.value,
        value: val.hidden,
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <TextInput type="hidden" :name="model?.name" v-model="inputState.hidden" />
</template>
