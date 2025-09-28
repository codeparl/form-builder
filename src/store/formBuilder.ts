import { defineStore } from 'pinia'
import type { FormSection } from '@/types/fields'
import { ref } from 'vue'

export const useFormBuilderStore = defineStore('formBuilder', () => {
  const sections = ref<FormSection[]>([])

  const setSections = (newSections: FormSection[]) => {
    sections.value = newSections
  }

  const updateSection = (index: number, section: FormSection) => {
    sections.value[index] = section
  }

  return { sections, setSections, updateSection }
})
