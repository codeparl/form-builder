export type FieldCategory = 'html' | 'input' | 'button' | 'layout' | 'file' | 'hidden'

export interface FormField {
  id: string
  type: string
  name: string
  label: string
  required: boolean
  value: any
  subType?: string
  placeholder?: string
  helpText?: string
  class?: string
  disabled?: boolean
  readonly?: boolean
  editable: boolean
  options?: any[]
  values?: any[]
  min?: number
  max?: number
  rows?: number
  columns?: number
  step?: number
  style?: string
  buttonStyle?: string
  category?: FieldCategory
  text?: string
  level?: number
  multiple?: boolean
  pattern?: string
  accept?: string
  children?: FormField[]
  [key: string]: any
}

export interface FormSection {
  id: string
  title: string
  priority?: number
  open?: boolean
  description?: string
  editable: boolean
  fields: FormField[]
}

export interface FormSchema {
  sections: FormSection[]
}
