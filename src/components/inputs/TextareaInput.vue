<!-- components/TextareaInput.vue -->
<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { useFormBuilderTheme } from '@/store/theme'
const theme = useFormBuilderTheme()
const props = defineProps<{
  modelValue: string
  placeholder?: string
  max?: number
  size?: 'small' | 'medium' | 'large'
  rows?: number
}>()

const emit = defineEmits(['update:modelValue'])

const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'px-2 py-1 text-sm'
    case 'large':
      return 'px-4 py-3 text-lg'
    default:
      return 'px-3 py-2 text-base'
  }
})

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <textarea
    :rows="props.rows || 4"
    class="w-full border rounded-sm shadow-sm focus:ring-1 outline-none transition placeholder-gray-400 resize-none"
    :class="
      (sizeClass,
      theme.darkMode
        ? 'bg-neutral-900 border-gray-800 hover:border-gray-400 focus:ring-gray-500 '
        : 'bg-white hover:border-green-500 focus:ring-green-500  border-gray-300')
    "
    :placeholder="placeholder"
    :value="modelValue"
    :maxlength="max"
    @input="onInput"
  />
</template>
