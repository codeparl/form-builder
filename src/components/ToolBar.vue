<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import type { FormSection } from '../types/fields'
import { useI18n } from '@/i18n/useI18n'

// Vue Material Icons
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import CloudUploadIcon from 'vue-material-design-icons/CloudUpload.vue'
import CloudDownloadIcon from 'vue-material-design-icons/CloudDownload.vue'
import CodeTagsIcon from 'vue-material-design-icons/CodeTags.vue'
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'

const { t } = useI18n()

// Props & emits
const props = defineProps<{
  formSections: FormSection[]
  allowImport?: boolean
  allowExport?: boolean
}>()
const emit = defineEmits(['clear', 'save', 'add-section', 'import', 'export'])

const showJson = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)
const message = useMessage()
const dialog = useDialog()

// Computed flags from options
const allowExport = computed(() => props.allowExport ?? true)
const allowImport = computed(() => props.allowImport ?? true)

// JSON representation
const formattedJson = computed(() => JSON.stringify(props.formSections, null, 2))

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

// View JSON
const onViewJson = () => {
  showJson.value = true
}

// Save
const onSave = () => {
  emit('save', props.formSections)
}

// Add Section
const onAddSection = () => emit('add-section')

// Export JSON
const onExport = () => {
  if (!allowExport.value) {
    message.error(t('Exporting is disabled for this form.'))
    return
  }

  const blob = new Blob([formattedJson.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'form-data.json'
  a.click()
  URL.revokeObjectURL(url)
  emit('export', props.formSections)
  message.success(t('Form exported!'))
}

// Trigger file input
const onImport = () => {
  if (!allowImport.value) {
    message.error(t('Importing is disabled for this form.'))
    return
  }
  fileInputRef.value?.click()
}

// Handle uploaded JSON
const onFileChange = async (event: Event) => {
  if (!allowImport.value) return

  const target = event.target as HTMLInputElement
  if (!target.files?.length) return
  const file = target.files[0]

  try {
    const text = await file.text()
    const parsed = JSON.parse(text)
    if (!Array.isArray(parsed)) throw new Error('Invalid JSON structure')
    emit('import', parsed)
    message.success(t('Form imported successfully!'))
  } catch (err: any) {
    message.error(t('Failed to import JSON: ') + err.message)
  } finally {
    target.value = ''
  }
}
</script>

<template>
  <div
    class="flex items-center justify-between p-2 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 rounded-t-lg"
  >
    <!-- Title -->
    <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200">
      {{ t('canvas.heading') }}
    </h3>

    <!-- Icon-only Toolbar -->
    <div class="flex items-center gap-2">
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="tiny" class="!p-3 !px-2" type="success" @click="onAddSection">
            <template #icon><PlusIcon /></template>
          </n-button>
        </template>
        <span>{{ t('toolbar.addSection') }}</span>
      </n-tooltip>

      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="tiny" class="!p-3 !px-2" type="error" @click="onClear">
            <template #icon><DeleteIcon /></template>
          </n-button>
        </template>
        <span>{{ t('toolbar.clear') }}</span>
      </n-tooltip>

      <!-- Import -->
      <n-tooltip v-if="allowImport" placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="tiny" class="!p-3 !px-2" type="warning" @click="onImport">
            <template #icon><CloudUploadIcon /></template>
          </n-button>
        </template>
        <span>{{ t('toolbar.import') }}</span>
      </n-tooltip>
      <input ref="fileInputRef" type="file" accept="application/json" class="hidden" @change="onFileChange" />

      <!-- Export -->
      <n-tooltip v-if="allowExport" placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="tiny" class="!p-3 !px-2" type="success" @click="onExport">
            <template #icon><CloudDownloadIcon /></template>
          </n-button>
        </template>
        <span>{{ t('toolbar.export') }}</span>
      </n-tooltip>

      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="tiny" class="!p-3 !px-2" type="info" @click="onViewJson">
            <template #icon><CodeTagsIcon /></template>
          </n-button>
        </template>
        <span>{{ t('toolbar.viewJson') }}</span>
      </n-tooltip>

      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="tiny" class="!p-3 !px-2" type="primary" @click="onSave">
            <template #icon><ContentSaveIcon /></template>
          </n-button>
        </template>
        <span>{{ t('toolbar.save') }}</span>
      </n-tooltip>
    </div>
  </div>

  <!-- JSON Modal -->
  <n-modal
    v-model:show="showJson"
    preset="card"
    style="width: 75rem; max-width: 95vw"
    title="Form Data JSON"
    :mask-closable="true"
  >
    <div class="overflow-y-auto p-3 bg-gray-900 text-green-300 rounded" style="max-height: 80vh; white-space: pre-wrap">
      <pre class="text-sm">{{ formattedJson }}</pre>
    </div>
  </n-modal>
</template>
