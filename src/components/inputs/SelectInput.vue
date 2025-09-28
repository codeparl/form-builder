<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useFormBuilderTheme } from '@/store/theme'
const theme = useFormBuilderTheme()
const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: { type: Array as () => { value: any; label: string }[], default: () => [] },
  size: { type: String, default: 'medium' },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Select...' },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() => props.options.find(opt => opt.value === props.modelValue) || null)

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const selectOption = (option: any) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

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

const handleClickOutside = (e: MouseEvent) => {
  if (triggerRef.value && !triggerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="triggerRef" class="relative w-full inline-block">
    <!-- Trigger -->
    <div
      class="flex items-center justify-between border rounded shadow-sm cursor-pointer transition duration-150 ease-in-out focus:ring-1"
      :class="[
        sizeClass,
        { ' cursor-not-allowed opacity-60': disabled },
        theme.darkMode
          ? 'bg-neutral-900 border-gray-600 hover:border-gray-400 focus:ring-gray-500 '
          : 'bg-white hover:border-green-500 focus:ring-green-500  border-gray-300',
      ]"
      @click="toggleDropdown"
    >
      <span class="text-gray-700">
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>

      <!-- Chevron Icon -->
      <svg
        class="w-4 h-4 text-gray-500 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown -->
    <transition name="fade">
      <ul
        v-if="isOpen"
        :class="[theme.darkMode ? 'border-gray-800 text-gray-400 bg-neutral-900 ' : 'border-gray-200 bg-white ']"
        class="absolute left-0 z-50 p-2 mt-1 w-full max-h-60 overflow-y-auto rounded border shadow-lg"
        @click.stop
      >
        <li
          v-for="opt in options"
          :key="opt.value"
          class="px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-200"
          :class="{
            'text-green-600 font-medium bg-gray-100': opt.value === modelValue,
            'bg-neutral-800': opt.value === modelValue && theme.darkMode,
            'hover:bg-neutral-800': theme.darkMode,
          }"
          @click.stop="selectOption(opt)"
        >
          <span>{{ opt.label }}</span>

          <!-- Checkmark only for selected -->
          <svg
            v-if="opt.value === modelValue"
            class="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
