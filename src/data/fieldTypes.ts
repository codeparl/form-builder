// src/data/fieldTypes.ts
import type { FieldCategory, FormField } from '../types/fields'
import { useI18n } from '@/i18n/useI18n'
// Import Vue Material Design Icons
import TextBoxOutline from 'vue-material-design-icons/TextBoxOutline.vue'
import CheckboxMarkedOutlineIcon from 'vue-material-design-icons/CheckboxMarkedOutline.vue'
import RadioboxMarkedIcon from 'vue-material-design-icons/RadioboxMarked.vue'
import FormSelect from 'vue-material-design-icons/FormSelect.vue'
import FormTextBox from 'vue-material-design-icons/FormTextbox.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import ButtonCursor from 'vue-material-design-icons/ButtonCursor.vue'
import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue'
import Pound from 'vue-material-design-icons/Pound.vue'
import HiddenFolder from 'vue-material-design-icons/FolderHidden.vue'
// Structural / Content Icons
import FormatHeader1Icon from 'vue-material-design-icons/FormatHeader1.vue'
import FormatParagraphIcon from 'vue-material-design-icons/FormatParagraph.vue'

export interface FieldType {
  type: string
  icon?: any
}

// Default available field types (used in sidebar for dragging)
export const fieldTypes: FieldType[] = [
  { type: 'button', icon: ButtonCursor },
  { type: 'text', icon: FormTextBox },
  { type: 'hidden', icon: HiddenFolder },
  { type: 'number', icon: Pound },
  { type: 'textarea', icon: TextBoxOutline },
  { type: 'select', icon: FormSelect },
  { type: 'checkbox', icon: CheckboxMarkedOutlineIcon },
  { type: 'radio', icon: RadioboxMarkedIcon },
  { type: 'date', icon: CalendarIcon },
  { type: 'file', icon: FileDocumentOutlineIcon },
  { type: 'heading', icon: FormatHeader1Icon },
  { type: 'paragraph', icon: FormatParagraphIcon },
]
let fieldIdCounter = 0

export const createField = (fieldType: FieldType): FormField => {
  const id = Date.now().toString() + '-' + fieldIdCounter++
  const { t } = useI18n()
  // Base field
  const field: FormField = {
    id,
    type: fieldType.type,
    subType: fieldType.type,
    name: `${fieldType.type}-${id}`,
    label: t(`field.${fieldType.type}`),
    required: false,
    value: null,
    editable: true,
    category: 'input' as FieldCategory,
    class: 'form-control',
  }

  return field
}
