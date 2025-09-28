<script setup lang="ts">
import { ref, reactive, defineExpose, computed } from 'vue'

// Import Material Icons
import AlertCircleIcon from 'vue-material-design-icons/AlertCircle.vue'
import AlertIcon from 'vue-material-design-icons/Alert.vue'
import CheckCircleIcon from 'vue-material-design-icons/CheckCircle.vue'
import CloseCircleIcon from 'vue-material-design-icons/CloseCircle.vue'

interface DialogOptions {
  title?: string
  content: string
  positiveText?: string
  negativeText?: string
  onPositiveClick?: () => void
  onNegativeClick?: () => void
  type?: 'info' | 'warning' | 'success' | 'error'
}

const visible = ref(false)
const options = reactive<DialogOptions>({
  title: '',
  content: '',
  positiveText: 'OK',
  negativeText: 'Cancel',
  type: 'info',
})

function showDialog(opts: DialogOptions) {
  Object.assign(options, opts)
  visible.value = true
}

function close() {
  visible.value = false
}

function handlePositiveClick() {
  options.onPositiveClick?.()
  close()
}

function handleNegativeClick() {
  options.onNegativeClick?.()
  close()
}

// Expose API to parent
defineExpose({ showDialog })

// Compute icon based on type
const stateIcon = computed(() => {
  switch (options.type) {
    case 'info':
      return AlertCircleIcon
    case 'warning':
      return AlertIcon
    case 'success':
      return CheckCircleIcon
    case 'error':
      return CloseCircleIcon
    default:
      return AlertCircleIcon
  }
})

// Compute icon color
const iconColor = computed(() => {
  switch (options.type) {
    case 'info':
      return 'text-blue-500'
    case 'warning':
      return 'text-yellow-500'
    case 'success':
      return 'text-green-500'
    case 'error':
      return 'text-red-500'
    default:
      return 'text-blue-500'
  }
})
</script>

<template>
  <teleport to="body">
    <div class="ub-vue-form-builder">
      <transition name="dialog-scale" appear>
        <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" @click="close"></div>

          <!-- Dialog Card -->
          <div
            class="bg-white rounded-md shadow-lg z-50 max-w-md w-full p-5 flex flex-col gap-4 transform transition-all"
          >
            <!-- Icon + Title -->
            <div class="flex items-center gap-3">
              <component :is="stateIcon" class="w-6 h-6" :class="iconColor" />
              <h3 v-if="options.title" class="text-lg font-semibold">
                {{ options.title }}
              </h3>
            </div>

            <!-- Content -->
            <p class="text-gray-700">{{ options.content }}</p>

            <!-- Actions -->
            <div class="flex justify-end items-center gap-2 mt-4">
              <ButtonInput
                size="small"
                :label="options.negativeText"
                :is-outline="true"
                :type="options.type"
                @click="handleNegativeClick"
              />
              <ButtonInput
                size="small"
                :label="options.positiveText"
                :type="options.type"
                @click="handlePositiveClick"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style scoped>
/* Scale from top animation */
.dialog-scale-enter-from {
  opacity: 0;
  transform: translateY(-1.5rem) scale(0.95);
}
.dialog-scale-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.dialog-scale-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.dialog-scale-leave-to {
  opacity: 0;
  transform: translateY(-1.5rem) scale(0.95);
}
.dialog-scale-enter-active,
.dialog-scale-leave-active {
  transition: all 0.25s ease-out;
}
</style>
