import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormBuilderTheme = defineStore('formBuilderTheme', () => {
  const darkMode = ref(false)

  function setDarkMode(value: boolean) {
    darkMode.value = value
  }

  function toggleDark() {
    darkMode.value = !darkMode.value
  }

  return { darkMode, setDarkMode, toggleDark }
})
