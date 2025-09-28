<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: { type: Array as () => string[], default: () => [] },
  size: { type: String, default: 'medium' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

// Internal selected value
const selected = ref(props.modelValue ?? props.options[0] ?? null)

// Watch parent modelValue to update internal selected
watch(
  () => props.modelValue,
  val => {
    selected.value = val ?? props.options[0] ?? null
  }
)

// Emit changes when internal selected changes
watch(selected, val => {
  emit('update:modelValue', val)
  emit('change', val)
})

// Optional: size classes
const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'px-2 py-1 text-sm'
    case 'large':
      return 'px-4 py-2 text-lg'
    default:
      return 'px-3 py-2 text-base'
  }
})
</script>

<template>
  <div class="flex flex-row gap-6 items-center">
    <label
      v-for="opt in props.options"
      :key="opt"
      class="flex items-center cursor-pointer select-none"
      :class="{ 'opacity-50 cursor-not-allowed': props.disabled }"
    >
      <!-- Custom radio -->
      <span
        class="w-4 h-4 mr-2 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors duration-150"
        :class="selected === opt ? 'border-green-600 bg-green-600' : 'border-gray-300 bg-white'"
        @click="!props.disabled && (selected = opt)"
      >
        <span v-if="selected === opt" class="w-2 h-2 bg-white rounded-full"></span>
      </span>

      <!-- Label -->
      <span :class="selected === opt ? 'text-green-600 font-medium' : 'text-gray-700'">
        {{ opt }}
      </span>
    </label>
  </div>
</template>
