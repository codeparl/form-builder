import type { FormBuilderOptions } from './types'

export const defaultOptions: FormBuilderOptions = {
  darkMode: false, // or 'dark'
  language: 'en',
  showToolbar: true,
  maxFields: 50,
  allowExport: true,
  allowImport: true,
  showSaveBtn: true,
  showThemeToggleBtn: true,
  allowViewSchema: true,
  defaultFieldProps: {
    required: false,
    placeholder: '',
  },
}
