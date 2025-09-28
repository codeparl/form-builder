<script setup lang="ts">
import { ref, reactive, toRef, watch, computed } from 'vue'
import type { FormField, FormSection } from '@/types/fields'
import { fieldTypes, createField } from '@/data/fieldTypes'
import { useI18n } from '@/i18n/useI18n'
import ToolBar from './ToolBar.vue'
import Palette from './Palette.vue'
import LanguageSelect from './LanguageSelect.vue'
import { defaultOptions } from '../config/defaultOptions'
import type { FormBuilderOptions } from '../config/types'
import { addSection, useDragAndDrop } from '@/composable/useDragAndDrop'
import CanvasComponent from './CanvasComponent.vue'
import { useFormBuilderTheme } from '@/store/theme'
import type { Language } from '@/i18n'

const props = defineProps<{
  options?: FormBuilderOptions
  sections?: FormSection[]
  isDarkMode?: boolean
}>()

const emit = defineEmits<{
  (e: 'autosave', sections: FormSection[]): void
  (e: 'drag-start', payload: { event: any; sections: FormSection[] }): void
  (e: 'drag-end', payload: { event: any; sections: FormSection[] }): void
  (e: 'drag-move', payload: { event: any; sections: FormSection[] }): void
}>()

// ---------------- Options & Dark Mode ----------------
const option = reactive({ ...defaultOptions, ...props.options })
const theme = useFormBuilderTheme()
theme.setDarkMode(props.isDarkMode ?? false)

const wrapperClass = computed(() => ({
  'ub-vue-form-builder': true,
  dark: theme.darkMode || false,
}))

// ---------------- Sections ----------------
const formSections = ref<FormSection[]>([])
const saveForm = () => {
  emit('autosave', formSections.value)
}

if (props.sections && Array.isArray(props.sections) && props.sections.length > 0) {
  formSections.value = props.sections
} else {
  addSection(formSections, saveForm)
}

// Use first section with DnD composable
const firstSection = toRef(formSections.value, 0)
const { onDragStart, onDragEnd, onMove, moveFieldUp, moveFieldDown, duplicateField, editField } = useDragAndDrop(
  firstSection,
  saveForm
)

// ---------------- Language ----------------
const { setLanguage, t } = useI18n()
setLanguage(option.language as Language)

// ---------------- Utilities ----------------
const cloneField = (el: FormField) => createField(el)

const clearSections = () => {
  const nonEditable = formSections.value.filter(s => s.editable === false)
  formSections.value = [...nonEditable]
  if (!formSections.value.some(s => s.editable !== false) && nonEditable.length === 0) {
    addSection(formSections, saveForm)
  }
}

const addNewSection = () => addSection(formSections, saveForm)
const onImportJson = (sections: FormSection[]) => {
  if (!Array.isArray(sections)) return
  formSections.value = sections
  saveForm()
}

// ---------------- Forward drag events to parent ----------------
const handleDragStart = (evt: any) => {
  onDragStart(evt)
  emit('drag-start', { event: evt, sections: formSections.value })
}

const handleDragMove = (evt: any) => {
  onMove(evt)
  emit('drag-move', { event: evt, sections: formSections.value })
}

const handleDragEnd = (evt: any) => {
  onDragEnd(evt)
  emit('drag-end', { event: evt, sections: formSections.value })
}
</script>

<template>
  <div :class="wrapperClass">
    <div class="min-h-screen flex flex-col px-4 md:justify-between md:items-start md:flex-row">
      <!-- Canvas / Form Area -->
      <div
        class="md:w-[74%] w-full relative p-0 rounded-md"
        :class="[theme.darkMode ? 'border-gray-800 bg-neutral-900' : 'border-gray-200 border bg-white']"
      >
        <ToolBar
          :form-sections="formSections"
          :options="{
            darkMode: option.darkMode,
            showToolbar: option?.showToolbar,
            allowExport: option.allowExport,
            allowImport: option.allowImport,
            showSaveBtn: option.showSaveBtn,
            showThemeToggleBtn: option.showThemeToggleBtn,
            allowViewSchema: option.allowViewSchema,
          }"
          @clear="clearSections"
          @add-section="addNewSection"
          @import="onImportJson"
          @save="saveForm"
        />

        <CanvasComponent
          v-model:sections="formSections"
          @move-up="moveFieldUp"
          @move-down="moveFieldDown"
          @duplicate="duplicateField"
          @edit="editField"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
          @move="handleDragMove"
          :class="[theme.darkMode ? 'bg-neutral-900' : 'bg-white', 'p-0 rounded-b-lg']"
        />
      </div>

      <!-- Sidebar -->
      <div
        :class="[theme.darkMode ? 'border-gray-800 bg-neutral-900' : 'border-gray-200 bg-white']"
        class="md:w-[24%] w-full max-h-[600px] rounded-lg border-l p-4"
      >
        <LanguageSelect />
        <Palette
          :field-types="fieldTypes"
          :clone-field="cloneField"
          @start="handleDragStart"
          @end="handleDragEnd"
          @move="handleDragMove"
        />
      </div>
    </div>
  </div>
</template>

<style>
.ub-vue-form-builder {
  font-family: sans-serif;
}
</style>
