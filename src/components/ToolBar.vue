<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import type { FormField, FormSection } from '../types/fields'
import { useI18n } from '@/i18n/useI18n'

const { t } = useI18n()

// Props
const props = defineProps<{
  formSections: FormSection[]
}>()

// Emits
const emit = defineEmits(['clear', 'save', 'add-section'])

const showJson = ref(false)
const message = useMessage()
const dialog = useDialog()

// Clear all sections
const onClear = () => {
  dialog.warning({
    title: t('Confirm Deletion'),
    content: t('Are you sure you want to delete all sections? This action cannot be undone.'),
    positiveText: t('Yes, delete'),
    negativeText: t('Cancel'),
    onPositiveClick: () => {
      emit('clear')
      message.warning(t('All sections cleared!'))
    },
  })
}

// JSON representation of all sections + fields
const formattedJson = computed(() => JSON.stringify(props.formSections, null, 2))

const onViewJson = () => {
  showJson.value = true
}

const onSave = () => {
  emit('save', props.formSections)
  message.success('Form saved successfully!')
}

// Add new section
const onAddSection = () => {
  emit('add-section')
}
</script>

<template>
  <div
    class="flex items-center justify-between p-2 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 rounded-t-lg"
  >
    <!-- Left: Title -->
    <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200">{{ t('canvas.heading') }}</h3>

    <!-- Right: Actions -->
    <div class="flex items-center gap-2">
      <!-- Add Section -->
      <n-button size="small" type="success" ghost @click="onAddSection">
        {{ t('toolbar.addSection') }}
      </n-button>

      <!-- Clear All -->
      <n-button size="small" type="error" ghost @click="onClear">
        {{ t('toolbar.clear') }}
      </n-button>

      <!-- View JSON -->
      <n-button size="small" type="info" ghost @click="onViewJson">
        {{ t('toolbar.viewJson') }}
      </n-button>

      <!-- Save -->
      <n-button size="small" type="primary" @click="onSave">
        {{ t('toolbar.save') }}
      </n-button>
    </div>
  </div>

  <!-- Modal to display JSON -->
  <n-modal v-model:show="showJson" preset="card" style="width: 75rem; max-width: 95vw" title="Form Data JSON">
    <pre class="text-sm bg-gray-900 text-green-300 p-3 rounded overflow-x-auto">
      {{ formattedJson }}
    </pre>
  </n-modal>
</template>
