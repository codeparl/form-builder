<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface RadioOption {
  label: string
  value: string | number
}

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: { type: Array as () => RadioOption[], default: () => [] },
  size: { type: String, default: 'medium' },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' },
  id: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'change'])

const selected = ref(props.modelValue ?? props.options[0]?.value ?? null)

watch(
  () => props.modelValue,
  val => {
    selected.value = val ?? props.options[0]?.value ?? null
  }
)

watch(selected, val => {
  emit('update:modelValue', val)
  emit('change', val)
})

const selectOption = (val: string | number) => {
  if (!props.disabled) {
    selected.value = val
  }
}
</script>

<template>
  <div class="flex flex-col space-y-1">
    <label v-if="label" class="text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>

    <div class="flex flex-row gap-6 items-center">
      <label v-for="opt in props.options" :key="opt.value" class="flex items-center cursor-pointer select-none"
        :class="{ 'opacity-50 cursor-not-allowed': props.disabled }">
        <!-- Custom radio -->
        <span
          class="w-4 h-4 mr-2 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors duration-150"
          :class="selected === opt.value ? 'border-green-600 bg-green-600' : 'border-gray-300 bg-white'"
          @click="selectOption(opt.value)">
          <span v-if="selected === opt.value" class="w-2 h-2 bg-white rounded-full"></span>
        </span>

        <!-- Label -->
        <span :class="selected === opt.value ? 'text-green-600 font-medium' : 'text-gray-700'">
          {{ opt.label }}
        </span>
      </label>
    </div>
  </div>
</template>
