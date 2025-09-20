import type { Ref } from 'vue'
import type { SortableEvent } from 'sortablejs'
import type { FormField, FormSection } from '@/types/fields'

export function useDragAndDrop(section: Ref<FormSection>) {
  const onDragStart = (evt: SortableEvent) => {
    console.log('Drag started:', evt)
  }

  const onDragEnd = (evt: SortableEvent) => {
    console.log('Drag ended:', evt)
  }

  const onMove = (evt: any) => {
    console.log('Moving:', evt)
    return true
  }

  const moveFieldUp = (fieldIndex: number) => {
    if (fieldIndex > 0) {
      const [item] = section.value.fields.splice(fieldIndex, 1)
      section.value.fields.splice(fieldIndex - 1, 0, item)
    }
  }

  const moveFieldDown = (fieldIndex: number) => {
    if (fieldIndex < section.value.fields.length - 1) {
      const [item] = section.value.fields.splice(fieldIndex, 1)
      section.value.fields.splice(fieldIndex + 1, 0, item)
    }
  }

  const duplicateField = (field: FormField, fieldIndex: number) => {
    // Deep clone to avoid reference issues
    const copy: FormField = JSON.parse(JSON.stringify(field))

    // Generate a guaranteed unique ID
    const id = parseInt(copy.id.substring(copy.id.lastIndexOf('-') + 1)) + 1
    copy.id = `${field.id}-${id}`

    section.value.fields.splice(fieldIndex + 1, 0, copy)
  }

  const editField = (fieldIndex: number) => {
    const field = section.value.fields[fieldIndex]
    console.log('Open edit dialog for:', field, fieldIndex)
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

export function addSection(sections: Ref<FormSection[]>) {
  sections.value.push({
    id: `section-${Date.now()}`,
    title: `New Section ${sections.value.length + 1}`,
    description: '',
    priority: 0,
    editable: true,
    fields: [],
  })
}
