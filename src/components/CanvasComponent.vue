<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, toRef } from 'vue'
import { useI18n } from '@/i18n/useI18n'
import type { FormField, FormSection } from '@/types/fields'
import FieldOptionsPanel from './fields/FieldOptionsPanel.vue'
import FormSectionItem from '@/components/FormSectionItem.vue'
import { addSection, useDragAndDrop } from '@/composable/useDragAndDrop'
import { useFormBuilderTheme } from '@/store/theme'

const theme = useFormBuilderTheme()

// ---------------- Props & Emits ----------------
const props = defineProps<{ sections: FormSection[] }>()
const emit = defineEmits(['update:sections'])

// ---------------- i18n ----------------
const { t } = useI18n()

// ---------------- Editing State ----------------
const editingField = ref<FormField | null>(null)
const editingSectionIndex = ref(-1)
const editingFieldIndex = ref(-1)
const showOptionsPanel = ref(false)

// ---------------- Drag & Drop ----------------
// Always bind drag/drop helpers to first section
const firstSection = toRef(props.sections, 0)
const { onDragStart, onDragEnd, onMove, moveFieldUp, moveFieldDown, duplicateField, editField } =
  useDragAndDrop(firstSection)

// ---------------- Field & Section Updates ----------------
const onEditField = (field: FormField, sectionIndex: number, fieldIndex: number) => {
  editingField.value = { ...field }
  editingSectionIndex.value = sectionIndex
  editingFieldIndex.value = fieldIndex
  showOptionsPanel.value = true
}

const onUpdateField = (field: FormField) => {
  const section = props.sections[editingSectionIndex.value]
  if (!section) return
  section.fields[editingFieldIndex.value] = field
  emit('update:sections', props.sections)
  showOptionsPanel.value = false
}

const onUpdateSection = (section: FormSection, sectionIndex: number) => {
  props.sections[sectionIndex] = section
  emit('update:sections', props.sections)
}

const deleteSection = (sectionIndex: number) => {
  props.sections.splice(sectionIndex, 1)
  if (props.sections.length === 0) {
    const secs = toRef(props.sections)
    addSection(secs)
  }
}
</script>

<template>
  <div>
    <draggable
      id="drop-canvas"
      v-model="props.sections"
      :group="{ name: 'sections', pull: false, put: false }"
      item-key="id"
      tag="div"
      :sort="true"
      chosen-class="drop-chosen-sec"
      :ghost-class="'drop-sec-ghost'"
      :animation="300"
      :class="[theme.darkMode ? 'border-gray-700' : 'border-gray-500 bg-white']"
      class="overflow-x-hidden mx-auto gap-1 border-dashed p-2 flex flex-col"
      @start="onDragStart"
      @move="onMove"
      @end="onDragEnd"
    >
      <template #item="{ element: section, index: sectionIndex }">
        <FormSectionItem
          :section="section"
          :section-index="sectionIndex"
          @update:section="section => onUpdateSection(section, sectionIndex)"
          @delete-section="deleteSection(sectionIndex)"
          @edit-field="onEditField"
          @move-up="moveFieldUp"
          @move-down="moveFieldDown"
          @duplicate="duplicateField"
          @edit="editField"
        />
      </template>
    </draggable>

    <FieldOptionsPanel
      :field="editingField"
      :show="showOptionsPanel"
      @update="onUpdateField"
      @close="() => (showOptionsPanel = false)"
    />
  </div>
</template>
