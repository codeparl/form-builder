export type FieldCategory = 'text' | 'number' | 'choice' | 'boolean' | 'button' | 'layout'

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
  min?: number
  max?: number
  step?: number
  style?: string
  pattern?: string
  children?: FormField[]
  [key: string]: any
}

export interface FormSection {
  id: string
  title: string
  description?: string
  editable: boolean
  fields: FormField[]
}

export interface FormSchema {
  sections: FormSection[]
}

export const fieldCategoryMap: Record<string, FieldCategory> = {
  // Text-like inputs
  text: 'text',
  email: 'text',
  password: 'text',
  color: 'text',
  url: 'text',
  textarea: 'text',

  // Numeric inputs
  number: 'number',
  range: 'number',

  // Choice inputs
  select: 'choice',
  radio: 'choice',
  checkbox: 'choice',

  // Boolean
  switch: 'boolean',

  // Buttons
  button: 'button',
  submit: 'button',
  reset: 'button',

  // Layout/grouping
  section: 'layout',
  group: 'layout',
}

export const getFieldCategory = (type: string): FieldCategory | undefined => {
  return fieldCategoryMap[type]
}
