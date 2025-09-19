<script setup lang="ts">
import { ref, reactive, computed, toRef } from 'vue'
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
import type { Language } from '@/i18n'
const { t } = useI18n()

// Props & options
const props = defineProps<{ options?: FormBuilderOptions }>()
const option = reactive({ ...defaultOptions, ...props.options })

// Sections
const formSections = ref<FormSection[]>([])

if (formSections.value.length === 0) {
  addSection(formSections)
}

// Language
const { setLanguage } = useI18n()
setLanguage((option.language as Language) ?? 'en')

// Clone a field
const cloneField = (el: FormField): FormField => createField(el)

const firstSection = toRef(formSections.value, 0)
const { onDragStart, onDragEnd, onMove, moveFieldUp, moveFieldDown, duplicateField, editField } =
  useDragAndDrop(firstSection)

// Clear all sections
const clearSections = () => {
  formSections.value = []
  addSection(formSections)
}

const addNewSection = () => {
  addSection(formSections)
}
</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <div class="min-h-screen flex flex-col md:flex-row">
        <main class="md:flex-1 relative p-6">
          <!-- Toolbar -->
          <ToolBar :form-sections="formSections" @clear="clearSections" @add-section="addNewSection" />

          <CanvasComponent
            v-model:sections="formSections"
            @move-up="moveFieldUp"
            @move-down="moveFieldDown"
            @duplicate="duplicateField"
            @edit="editField"
            @drag-start="onDragStart"
            @drag-end="onDragEnd"
            @move="onMove"
          />
        </main>

        <!-- Sidebar -->
        <aside class="md:w-1/4 w-full border-l border-gray-200 dark:border-gray-700 p-4 space-y-4">
          <LanguageSelect />
          <Palette :field-types="fieldTypes" :clone-field="cloneField" />
        </aside>
      </div>
    </n-dialog-provider>
  </n-message-provider>
</template>
