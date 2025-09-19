import { ref, computed } from 'vue'
import { messages, type Language } from './index'

const currentLang = ref<Language>('en')

export function useI18n() {
  const t = (path: string) => {
    const keys = path.split('.')
    return keys.reduce((acc: any, key) => acc?.[key], messages[currentLang.value]) ?? path
  }

  const setLanguage = (lang: Language) => {
    if (messages[lang]) currentLang.value = lang
  }

  return { t, setLanguage, currentLang }
}
