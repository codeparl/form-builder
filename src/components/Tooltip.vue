<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'

const props = defineProps({
  content: String,
  placement: { type: String, default: 'top' },
  trigger: { type: String, default: 'hover' },
  delay: Number,
})

const emit = defineEmits(['show', 'hide'])

const show = ref(false)
const timeout = ref(null)
const tooltipEl = ref(null)
const triggerEl = ref(null)
const finalPlacement = ref(props.placement)
const arrowStyle = ref({})

const triggerType = computed(() => props.trigger || 'hover')

function showTooltip() {
  if (props.delay) {
    timeout.value = setTimeout(() => {
      show.value = true
      emit('show')
      nextTick(() => adjustPosition())
    }, props.delay)
  } else {
    show.value = true
    emit('show')
    nextTick(() => adjustPosition())
  }
}

function hideTooltip() {
  if (timeout.value) {
    clearTimeout(timeout.value)
    timeout.value = null
  }
  show.value = false
  emit('hide')
}

function handleClickOutside(e) {
  if (props.trigger === 'click' && tooltipEl.value && triggerEl.value) {
    if (!tooltipEl.value.contains(e.target) && !triggerEl.value.contains(e.target)) {
      hideTooltip()
    }
  }
}

function adjustPosition() {
  if (!tooltipEl.value || !triggerEl.value) return

  const tooltipRect = tooltipEl.value.getBoundingClientRect()
  const triggerRect = triggerEl.value.getBoundingClientRect()
  const margin = 8

  const fits = {
    top: triggerRect.top >= tooltipRect.height + margin,
    bottom: window.innerHeight - triggerRect.bottom >= tooltipRect.height + margin,
    left: triggerRect.left >= tooltipRect.width + margin,
    right: window.innerWidth - triggerRect.right >= tooltipRect.width + margin,
  }

  finalPlacement.value =
    props.placement && fits[props.placement] ? props.placement : Object.keys(fits).find(k => fits[k]) || 'top'

  // Arrow positioning relative to tooltip
  const arrowOffset = {
    top: { bottom: '-0.25rem', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    bottom: { top: '-0.25rem', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    left: { right: '-0.25rem', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
    right: { left: '-0.25rem', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
  }
  arrowStyle.value = arrowOffset[finalPlacement.value]
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  if (timeout.value) clearTimeout(timeout.value)
})

window.addEventListener('resize', () => {
  if (show.value) nextTick(() => adjustPosition())
})

function tooltipStyle(placement) {
  switch (placement) {
    case 'top':
      return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '0.5rem' }
    case 'bottom':
      return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '0.5rem' }
    case 'left':
      return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '0.5rem' }
    case 'right':
      return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '0.5rem' }
    default:
      return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '0.5rem' }
  }
}
</script>

<template>
  <div
    class="relative inline-block"
    ref="triggerEl"
    @mouseenter="triggerType === 'hover' && showTooltip()"
    @mouseleave="triggerType === 'hover' && hideTooltip()"
    @click="triggerType === 'click' && (show ? hideTooltip() : showTooltip())"
  >
    <slot />
    <transition name="fade">
      <div
        v-if="show"
        ref="tooltipEl"
        class="absolute z-50 px-2 py-1 rounded text-white bg-gray-800 text-sm whitespace-nowrap"
        :style="tooltipStyle(finalPlacement)"
      >
        {{ content }}
        <span class="tooltip-arrow absolute w-2 h-2 bg-gray-800" :style="arrowStyle"></span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.85);
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
</style>
