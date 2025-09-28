import type { Ref } from 'vue'
import type { SortableEvent } from 'sortablejs'
import type { FormField, FormSection } from '@/types/fields'
import { useFormBuilderStore } from '@/store/formBuilder'

export function useDragAndDrop(section: Ref<FormSection>, saved?: () => void) {
  const onDragStart = (evt: any) => {}

  const onDragEnd = (evt: SortableEvent) => {
    if (saved) {
      saved()
    }
  }

  const onMove = (evt: any) => {
    return true
  }

  // Move a field up
  const moveFieldUp = (fieldIndex: number) => {
    if (fieldIndex <= 0) return
    const [item] = section.value.fields.splice(fieldIndex, 1)
    if (!item) return
    section.value.fields.splice(fieldIndex - 1, 0, item)
    if (saved) saved()
  }

  // Move a field down
  const moveFieldDown = (fieldIndex: number) => {
    if (fieldIndex >= section.value.fields.length - 1) return
    const [item] = section.value.fields.splice(fieldIndex, 1)
    if (!item) return
    section.value.fields.splice(fieldIndex + 1, 0, item)
    if (saved) saved()
  }

  // Duplicate a field
  const duplicateField = (fieldIndex: number) => {
    const field = section.value.fields[fieldIndex]
    if (!field) return

    const copy: FormField = JSON.parse(JSON.stringify(field))
    copy.id = `${field.id}-${Date.now()}`
    section.value.fields.splice(fieldIndex + 1, 0, copy)

    if (saved) saved()
  }

  const editField = (fieldIndex: number) => {
    const field = section.value.fields[fieldIndex]
    if (!field) return
  }

  return {
    onDragStart,
    onDragEnd,
    onMove,
    moveFieldUp,
    moveFieldDown,
    duplicateField,
    editField,
  }
}

/**
 * Utility to add a new section
 */
export function addSection(sections: Ref<FormSection[]>, saved?: () => void) {
  const myStore = useFormBuilderStore()
  const section = {
    id: `section-${Date.now()}`,
    title: `New Section ${sections.value.length + 1}`,
    description: '',
    priority: 0,
    open: true,
    editable: true,
    fields: [],
  }

  sections.value.push(section)
  myStore.setSections(sections.value)
  if (saved) saved()
}
