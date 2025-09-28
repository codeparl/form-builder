<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { useFormBuilderTheme } from '@/store/theme'
const theme = useFormBuilderTheme()
type ButtonSize = 'tiny' | 'small' | 'medium' | 'large'
type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default'

const props = withDefaults(
  defineProps<{
    size?: ButtonSize
    type?: ButtonType
    label?: string
    disabled?: boolean
    bordered?: boolean
    isOutline?: boolean
  }>(),
  {
    disabled: false,
    bordered: true,
    isOutline: false,
  }
)

const isBordered = computed(() => {
  if (theme.darkMode && !props.isOutline) {
    return false
  }
  return props.bordered
})

const emit = defineEmits(['click'])

// Tailwind classes based on size
const sizeClass = computed(() => {
  switch (props.size) {
    case 'tiny':
      return 'px-2 py-1 !p-[2px] text-sm rounded-sm'
    case 'small':
      return 'px-2 py-1 text-sm'
    case 'medium':
      return 'px-4 py-2 text-md'
    case 'large':
      return 'px-5 py-3 text-lg'
    default:
      return 'px-6 py-4 text-base'
  }
})

// Solid button type classes
const solidClass = computed(() => {
  if (props.isOutline) return ''
  switch (props.type) {
    case 'primary':
      return 'bg-blue-600 text-white hover:bg-blue-700'
    case 'secondary':
      return 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    case 'success':
      return 'bg-green-600 text-white hover:bg-green-700'
    case 'warning':
      return 'bg-yellow-600 text-white hover:bg-yellow-500'
    case 'error':
      return 'bg-red-600 text-white hover:bg-red-700'
    case 'info':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    default:
      return ` ${theme.darkMode ? 'bg-neutral-900 border-gray-800 hover:text-gray-600 hover:border-gray-600' : 'bg-white hover:text-green-600 hover:border-green-600'}  text-gray-800  `
  }
})

// Outline button type classes
const outlineClass = computed(() => {
  if (!props.isOutline) return ''
  switch (props.type) {
    case 'primary':
      return 'bg-transparent hover:text-blue-600 border-blue-600 text-blue-600  hover:bg-blue-600 hover:bg-opacity-10'
    case 'secondary':
      return 'bg-transparent hover:text-gray-600 border-gray-600 text-gray-600 hover:bg-gray-600 hover:bg-opacity-10'
    case 'success':
      return 'bg-transparent hover:text-green-600 hover:text-green-600  border-green-600 text-green-600  hover:bg-opacity-10'
    case 'warning':
      return 'bg-transparent  hover:text-white border-yellow-600 text-yellow-600  hover:bg-yellow-600 hover:bg-opacity-10'
    case 'error':
      return 'bg-transparent  border-red-600 text-red-600 hover:bg-red-600 hover:bg-opacity-10'
    case 'info':
      return 'bg-transparent  border-blue-400 text-blue-400 hover:bg-blue-400 hover:bg-opacity-10'
    default:
      return `bg-transparent  ${theme.darkMode ? 'border-gray-800' : 'border-gray-400'} text-gray-800 hover:bg-gray-800 hover:bg-opacity-10`
  }
})
</script>

<template>
  <button
    :class="`rounded-[3px] ${isBordered ? 'border' : 'border-0'} transition duration-150 focus:ring-0 f  outline-none cursor-pointer ${sizeClass} ${solidClass} ${outlineClass}`"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <span v-if="label">{{ label }}</span>
    <slot />
  </button>
</template>

<style scoped>
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
