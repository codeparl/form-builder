// src/data/fieldTypes.ts
import type { FormField } from '../types/fields'

// Import Vue Material Design Icons
import TextBoxOutline from 'vue-material-design-icons/TextBoxOutline.vue'
import CheckboxMarkedOutlineIcon from 'vue-material-design-icons/CheckboxMarkedOutline.vue'
import RadioboxMarkedIcon from 'vue-material-design-icons/RadioboxMarked.vue'
import FormSelect from 'vue-material-design-icons/FormSelect.vue'
import FormTextBox from 'vue-material-design-icons/FormTextbox.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import ButtonCursor from 'vue-material-design-icons/ButtonCursor.vue'
import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue'

// Structural / Content Icons
import FormatHeader1Icon from 'vue-material-design-icons/FormatHeader1.vue'
import FormatParagraphIcon from 'vue-material-design-icons/FormatParagraph.vue'
import FolderOutlineIcon from 'vue-material-design-icons/FolderOutline.vue'

export interface FieldType {
  type: string
  label: string
  icon?: any
}

// Default available field types (used in sidebar for dragging)
export const fieldTypes: FieldType[] = [
  { type: 'button', label: 'Button', icon: ButtonCursor },
  { type: 'text', label: 'Text Input', icon: FormTextBox },
  { type: 'textarea', label: 'Textarea', icon: TextBoxOutline },
  { type: 'select', label: 'Select', icon: FormSelect },
  { type: 'checkbox', label: 'Checkbox', icon: CheckboxMarkedOutlineIcon },
  { type: 'radio', label: 'Radio Group', icon: RadioboxMarkedIcon },
  { type: 'date', label: 'Date Picker', icon: CalendarIcon },
  { type: 'file', label: 'File Upload', icon: FileDocumentOutlineIcon },

  // Content / Structural elements
  { type: 'heading', label: 'Heading', icon: FormatHeader1Icon },
  { type: 'paragraph', label: 'Paragraph', icon: FormatParagraphIcon },
  { type: 'section', label: 'Section', icon: FolderOutlineIcon },
]

// Function to create a new form field with unique ID
export const createField = (fieldType: FieldType): FormField => ({
  ...fieldType,
  id: Date.now().toString(36) + Math.random().toString(36).slice(2),
  required: false,
  // Sections can have children fields
  children: fieldType.type === 'section' ? [] : undefined,
})
