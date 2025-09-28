<script setup lang="ts">
import { defineProps, defineEmits, computed, watch, onBeforeUnmount } from 'vue'
import { useFormBuilderTheme } from '@/store/theme'
const theme = useFormBuilderTheme()
const props = defineProps({
  show: Boolean,
  placement: { type: String, default: 'right' },
  width: String,
  height: String,
  maskClosable: { type: Boolean, default: true },
})

const emit = defineEmits(['update:show', 'close'])

function closeDrawer() {
  emit('update:show', false)
  emit('close')
}

// Lock body scroll
watch(
  () => props.show,
  val => {
    document.body.style.overflow = val ? 'hidden' : ''
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

// Classes based on placement
const placementClasses = computed(() => {
  switch (props.placement) {
    case 'left':
      return 'left-0 top-0 h-full'
    case 'right':
      return 'right-0 top-0 h-full'
    case 'top':
      return 'top-0 left-0 w-full'
    case 'bottom':
      return 'bottom-0 left-0 w-full'
    default:
      return 'right-0 top-0 h-full'
  }
})

// Inline style for width/height
const drawerStyle = computed(() => {
  return {
    width: props.placement === 'left' || props.placement === 'right' ? props.width || '400px' : '100%',
    height: props.placement === 'top' || props.placement === 'bottom' ? props.height || '300px' : '100%',
  }
})
</script>
<template>
  <teleport to="body">
    <div class="ub-vue-form-builder">
      <!-- Backdrop -->
      <transition name="fade">
        <div v-if="show" class="fixed inset-0 bg-black/50 z-[9999]" @click="maskClosable !== false && closeDrawer()" />
      </transition>

      <!-- Drawer Panel -->
      <transition name="slide">
        <div
          v-show="show"
          class="fixed shadow-lg z-[99999] transition-transform duration-300 ease-in-out"
          :class="[placementClasses, theme.darkMode ? '!bg-neutral-900 text-gray-300 ' : 'bg-white text-gray-800 ']"
          :style="drawerStyle"
        >
          <slot />
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

/* Slide from right as default */
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

/* You can add top/left/bottom/left variations if needed */
</style>
