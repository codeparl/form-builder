export interface DefaultFieldProps {
  required?: boolean
  placeholder?: string
  [key: string]: any
}

export interface FormBuilderOptions {
  darkMode?: boolean
  language?: string
  showToolbar?: boolean
  showPlaceholderMessage?: boolean
  placeholderText?: string
  maxFields?: number
  allowExport?: boolean
  allowImport?: boolean
  showSaveBtn?: boolean
  showThemeToggleBtn?: boolean
  allowViewSchema?: boolean
  defaultFieldProps?: DefaultFieldProps
}
