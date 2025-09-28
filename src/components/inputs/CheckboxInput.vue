<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const checked = computed({
  get: () => props.modelValue,
  set: val => {
    emit('update:modelValue', val)
    emit('change', val)
  },
})
</script>

<template>
  <label
    class="inline-flex items-center cursor-pointer select-none"
    :class="{ 'opacity-50 cursor-not-allowed': disabled }"
  >
    <input
      type="checkbox"
      v-model="checked"
      :disabled="disabled"
      class="h-4 w-4 rounded border-gray-300 accent-green-600 focus:ring-green-500"
    />
    <span v-if="label" class="ml-2 text-sm">
      {{ label }}
    </span>
  </label>
</template>
