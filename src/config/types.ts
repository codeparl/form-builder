export interface DefaultFieldProps {
  required?: boolean
  placeholder?: string
  [key: string]: any
}

export interface FormBuilderOptions {
  theme?: 'light' | 'dark'
  language?: string
  showToolbar?: boolean
  showPlaceholderMessage?: boolean
  placeholderText?: string
  maxFields?: number
  defaultFieldProps?: DefaultFieldProps
}
