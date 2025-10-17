<template>
  <teleport to="body">
    <div class="ub-vue-form-builder  relative">
      <transition enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 -translate-y-8 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-8 scale-95">
        <div v-if="modelValue"
          class="fixed inset-0 z-50 flex overflow-hidden items-start justify-center px-4 sm:px-6 pt-20" role="dialog"
          aria-modal="true" :aria-labelledby="title ? 'modal-title' : undefined">
          <!-- Transparent Backdrop -->
          <div class="absolute inset-0 bg-black/45 backdrop-blur-sm" :class="{ 'cursor-pointer': maskClosable }"
            @click="handleBackdropClick" @mousedown="handleBackdropMouseDown" />

          <!-- Modal Card -->

          <div
            class="relative flex flex-col  rounded-md shadow-2xl max-h-[90vh] overflow-hidden transform transition-all"
            :style="modalStyle" :class="[
              theme.darkMode ? 'bg-neutral-900 border border-gray-800 text-gray-300' : 'bg-white border border-gray-200 text-gray-800',
            ]">
            <!-- Header -->
            <div v-if="showHeader" class="flex h-[50px] w-full items-start justify-between px-6 py-4 border-b "
              :class="[theme.darkMode ? 'border-gray-800' : 'border-gray-200']">
              <div class="flex-1 min-w-0 truncate">
                <h2 v-if="title" id="modal-title" class="text-lg font-semibold truncate">
                  {{ title }}
                </h2>
                <slot name="header" />
              </div>
              <ButtonInput v-if="showCloseButton" @click="close" type="default" size="tiny" aria-label="Close modal"
                class="ml-3 inline-flex border-0 items-center justify-center  hover:!text-gray-100"
                :class="[theme.darkMode ? '!text-gray-300' : 'text-gray-500']">

                <svg class=" w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 20 20">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 5L5 15M5 5l10 10" />
                </svg>
              </ButtonInput>
            </div>

            <!-- Content -->
            <div class=" overflow-hidden w-full  px-6 py-4" :class="{
              'pt-2': showHeader,
              'pb-2': showFooter,
            }">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="showFooter" class="px-6 py-4 border-t shrink-0"
              :class="[theme.darkMode ? 'border-gray-800' : 'border-gray-200']">
              <slot name="footer" />
            </div>
          </div>

        </div>
      </transition>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, nextTick, watch, useSlots } from 'vue'
import { useFormBuilderTheme } from '@/store/theme'
import ButtonInput from './inputs/ButtonInput.vue'
const theme = useFormBuilderTheme()
interface Props {
  modelValue: boolean
  title?: string
  maskClosable?: boolean
  showCloseButton?: boolean
  width?: string | number
  maxWidth?: string | number
  closeOnEsc?: boolean
  preventScroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maskClosable: true,
  showCloseButton: true,
  closeOnEsc: true,
  preventScroll: true,
  width: '75rem',
  maxWidth: '95vw',
})

const emit = defineEmits(['update:modelValue', 'close', 'open'])
const slots = useSlots()
const isBackdropClick = ref(false)

const showHeader = computed(() => !!props.title || !!slots.header)
const showFooter = computed(() => !!slots.footer)
const modalStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
}))

function close() {
  emit('update:modelValue', false)
  emit('close')
}
function open() {
  emit('open')
}
function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnEsc) close()
}
function handleBackdropClick() {
  if (props.maskClosable && isBackdropClick.value) close()
}
function handleBackdropMouseDown(e: MouseEvent) {
  isBackdropClick.value = (e.target as Element).classList.contains('bg-black')
}
function setBodyScroll(prevent: boolean) {
  if (!props.preventScroll) return
  document.body.style.overflow = prevent ? 'hidden' : ''
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
  if (props.modelValue) {
    setBodyScroll(true)
    open()
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc)
  setBodyScroll(false)
})
watch(
  () => props.modelValue,
  newVal => {
    setBodyScroll(newVal)
    if (newVal) {
      open()
      nextTick(() => {
        const modal = document.querySelector('.relative.flex.flex-col') as HTMLElement
        const focusable = modal?.querySelector<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        )
        focusable?.focus()
      })
    }
  }
)
</script>
