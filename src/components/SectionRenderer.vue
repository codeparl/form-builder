<template>
  <div class="form-section mb-6 p-4 border rounded-md" :class="themeClass">
    <!-- Section Title -->
    <h2 v-if="section.title" class="text-xl font-semibold mb-4">{{ section.title }}</h2>

    <div class="inputs space-y-4">
      <component
        v-for="field in section.fields"
        :key="field.id"
        :is="resolveFieldComponent(field.type)"
        :label="field.label"
        :field="field"
        :placeholder="field.placeholder"
        v-model="formData[field.id]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import type { FormSection } from '@/types/fields'
import { useFormBuilderTheme } from '@/store/theme'
import { inputMap } from '@/composable/inputMap'

const theme = useFormBuilderTheme()

// Props
const props = defineProps<{
  section: FormSection
  modelValue?: Record<string, any>
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
}>()

// Local reactive form data
const formData = reactive({ ...(props.modelValue || {}) })

// Sync data with parent
watch(
  () => formData,
  val => emit('update:modelValue', val),
  { deep: true }
)

// Sync parent modelValue changes to local formData
watch(
  () => props.modelValue,
  newVal => {
    if (newVal) {
      Object.assign(formData, newVal)
    }
  },
  { deep: true }
)

// Map field types to components
const resolveFieldComponent = (type: string) => {
  const component = inputMap[type]
  if (!component) {
    console.warn(`Unknown field type: ${type}. No component will be rendered.`)
  }
  return component
}

// Theme class
const themeClass = computed(() =>
  theme.darkMode ? 'bg-neutral-900 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border-gray-200'
)
</script>

<style scoped>
.form-section {
  transition: all 0.2s ease;
}
</style>
