export interface FormField {
  id: string
  type: string
  label: string
  required?: boolean
  [key: string]: any
}
