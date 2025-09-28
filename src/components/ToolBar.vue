<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FormSection } from '../types/fields'
import { useI18n } from '@/i18n/useI18n'
import Modal from '@/components/Modal.vue'

// Vue Material Icons
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import CloudUploadIcon from 'vue-material-design-icons/CloudUpload.vue'
import CloudDownloadIcon from 'vue-material-design-icons/CloudDownload.vue'
import CodeTagsIcon from 'vue-material-design-icons/CodeTags.vue'
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'
import LightModeIcon from 'vue-material-design-icons/WhiteBalanceSunny.vue'
import DarkModeIcon from 'vue-material-design-icons/MoonWaningCrescent.vue'

import { dialog } from '@/plugins/dialog'
import { useFormBuilderTheme } from '@/store/theme'

const theme = useFormBuilderTheme()
const { t } = useI18n()

// Props & Emits
const props = defineProps<{
  formSections: FormSection[]
  options?: {
    darkMode?: boolean
    language?: string
    showToolbar?: boolean
    maxFields?: number
    allowExport?: boolean
    allowImport?: boolean
    showSaveBtn?: boolean
    showThemeToggleBtn?: boolean
    allowViewSchema?: boolean
  }
}>()

const emit = defineEmits<{
  (e: 'clear'): void
  (e: 'save', payload: FormSection[]): void
  (e: 'add-section'): void
  (e: 'import', payload: FormSection[]): void
  (e: 'export', payload: FormSection[]): void
}>()

// JSON modal state
const showJson = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

// Computed flags from options
const allowExport = computed(() => props.options?.allowExport ?? true)
const allowImport = computed(() => props.options?.allowImport ?? true)
const showSaveBtn = computed(() => props.options?.showSaveBtn ?? true)
const showThemeToggleBtn = computed(() => props.options?.showThemeToggleBtn ?? true)
const allowViewSchema = computed(() => props.options?.allowViewSchema ?? true)

// JSON representation
const formattedJson = computed(() => JSON.stringify(props.formSections, null, 2))

// Actions
const onClear = () => {
  dialog.warning({
    title: t('Confirm Deletion'),
    content: t('Are you sure you want to delete all sections? This action cannot be undone.'),
    positiveText: t('Yes, delete'),
    negativeText: t('Cancel'),
    onPositiveClick: () => emit('clear'),
  })
}

const onViewJson = () => (showJson.value = true)
const onSave = () => emit('save', props.formSections)
const onAddSection = () => emit('add-section')

const onExport = () => {
  if (!allowExport.value) return
  const blob = new Blob([formattedJson.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'form-data.json'
  a.click()
  URL.revokeObjectURL(url)
  emit('export', props.formSections)
}

const onImport = () => {
  if (!allowImport.value) return
  fileInputRef.value?.click()
}

const onFileChange = async (event: Event) => {
  if (!allowImport.value) return
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    const text = await file.text()
    const parsed = JSON.parse(text)
    if (!Array.isArray(parsed)) throw new Error('Invalid JSON structure')
    emit('import', parsed)
  } catch (err) {
    console.error(err)
  } finally {
    target.value = ''
  }
}

const buttonDark = computed(() => {
  return [theme.darkMode ? '!bg-transparent hover:!text-gray-100 !text-gray-300 !border-0' : '']
})
</script>

<template>
  <div
    :class="[
      theme.darkMode ? 'bg-neutral-900 text-gray-300 border-gray-700' : 'border-gray-300 text-gray-800 bg-white',
    ]"
    class="flex items-center justify-between p-2 border-b rounded-t-lg"
  >
    <!-- Title -->
    <h3 class="text-base font-semibold">
      {{ t('canvas.heading') }}
    </h3>

    <!-- Toolbar -->
    <div class="flex items-center gap-2" v-if="props.options?.showToolbar ?? true">
      <!-- Theme toggle -->
      <Tooltip
        v-if="showThemeToggleBtn"
        :content="theme.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        placement="bottom"
      >
        <ButtonInput @click="theme.toggleDark()" size="tiny" class="p-0 rounded">
          <LightModeIcon v-if="!theme.darkMode" />
          <DarkModeIcon v-else />
        </ButtonInput>
      </Tooltip>

      <!-- Add Section -->
      <Tooltip :content="t('toolbar.addSection')" placement="bottom">
        <ButtonInput size="tiny" :class="buttonDark" class="!p-0" @click="onAddSection">
          <PlusIcon />
        </ButtonInput>
      </Tooltip>

      <!-- Clear -->
      <Tooltip :content="t('toolbar.clear')" placement="bottom" trigger="hover">
        <ButtonInput size="tiny" :class="buttonDark" class="!p-0" @click="onClear">
          <DeleteIcon />
        </ButtonInput>
      </Tooltip>

      <!-- Import -->
      <Tooltip v-if="allowImport" :content="t('toolbar.import')" placement="bottom" trigger="hover">
        <ButtonInput size="tiny" :class="buttonDark" class="!p-0" @click="onImport">
          <CloudDownloadIcon />
        </ButtonInput>
      </Tooltip>
      <input ref="fileInputRef" type="file" accept="application/json" class="hidden" @change="onFileChange" />

      <!-- Export -->
      <Tooltip v-if="allowExport" :content="t('toolbar.export')" placement="bottom" trigger="hover">
        <ButtonInput size="tiny" :class="buttonDark" class="!p-0" @click="onExport">
          <CloudUploadIcon />
        </ButtonInput>
      </Tooltip>

      <!-- View JSON -->
      <Tooltip v-if="allowViewSchema" :content="t('toolbar.viewJson')" placement="bottom" trigger="hover">
        <ButtonInput :class="buttonDark" size="tiny" class="!p-0" @click="onViewJson">
          <CodeTagsIcon />
        </ButtonInput>
      </Tooltip>

      <!-- Save -->
      <Tooltip v-if="showSaveBtn" :content="t('toolbar.save')" placement="bottom" trigger="hover">
        <ButtonInput size="tiny" :class="buttonDark" class="!p-0" @click="onSave">
          <ContentSaveIcon />
        </ButtonInput>
      </Tooltip>
    </div>
  </div>

  <!-- JSON Modal -->
  <Modal v-model="showJson" :prevent-scroll="true" title="Form Data JSON">
    <div
      class="overflow-y-auto p-3 rounded-md bg-slate-900 text-green-300"
      style="max-height: 80vh; white-space: pre-wrap"
    >
      <pre class="text-sm">{{ formattedJson }}</pre>
    </div>
  </Modal>
</template>

<style scoped>
/* Optional: you can tweak button spacing, hover, etc. */
</style>
