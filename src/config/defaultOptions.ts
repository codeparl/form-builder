import type { FormBuilderOptions } from './types'

export const defaultOptions: FormBuilderOptions = {
  theme: 'light', // or 'dark'
  language: 'en',
  showToolbar: true,
  showPlaceholderMessage: true,
  placeholderText: 'Drag a field from the right to this area',
  maxFields: 50,
  allowExport: true,
  allowImport: true,
  defaultFieldProps: {
    required: false,
    placeholder: '',
  },
}
