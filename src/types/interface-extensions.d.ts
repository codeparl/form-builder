// src/types/interface-extensions.d.ts

import { ComponentCustomProperties, DefineComponent } from 'vue'

/**
 * Extend Vue component instance with any global helpers your library provides
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * Example: a global helper you might provide
     * Usage: this.$formBuilderHelper()
     */
    $formBuilderHelper: () => void
  }
}

/**
 * Optional: Extend the global window object if your library needs it
 */
declare global {
  interface Window {
    FormBuilderConfig?: Record<string, any>
  }
}

/**
 * Type for a single field in the form
 */
export interface Field {
  id: string
  type: string
  label: string
  required?: boolean
  [key: string]: any
}

/**
 * Options object for initializing FormBuilder
 */
export interface FormBuilderOptions {
  fields: Field[]
  onSubmit?: (data: Record<string, any>) => void
}

/**
 * Props exposed by the main FormBuilder component
 */
export interface FormBuilderProps {
  modelValue?: Record<string, any> // for v-model binding
  options?: FormBuilderOptions
}

/**
 * Events emitted by the FormBuilder component
 */
export type FormBuilderEmits = {
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'submit', value: Record<string, any>): void
}

/**
 * Type for the main FormBuilder Vue component
 */
export type FormBuilder = DefineComponent<FormBuilderProps, {}, {}, {}, {}, {}, FormBuilderEmits>
