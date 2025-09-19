<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, toRef } from 'vue'
import { useI18n } from '@/i18n/useI18n'
import type { FormField, FormSection } from '@/types/fields'
import FieldOptionsPanel from './fields/FieldOptionsPanel.vue'
import FormSectionItem from '@/components/FormSectionItem.vue'
import { addSection } from '@/composable/useDragAndDrop'

const props = defineProps<{ sections: FormSection[] }>()
const emit = defineEmits(['update:sections'])

const { t } = useI18n()

const editingField = ref<FormField | null>(null)
const editingSectionIndex = ref(-1)
const editingFieldIndex = ref(-1)
const showOptionsPanel = ref(false)

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
  if (props.sections.length == 0) {
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
      class="overflow-x-hidden border-2 bg-white shadow-xl mx-auto border-gray-500 gap-1 border-dashed rounded-lg p-2 flex flex-col dark:bg-gray-800"
      @end="emit('update:sections', props.sections)"
    >
      <template #item="{ element: section, index: sectionIndex }">
        <FormSectionItem
          :section="section"
          :section-index="sectionIndex"
          @update:section="section => onUpdateSection(section, sectionIndex)"
          @delete-section="deleteSection(sectionIndex)"
          @edit-field="onEditField"
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
