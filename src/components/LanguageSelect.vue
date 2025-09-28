<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from '../i18n/useI18n'
import { languages } from '../i18n/languages'
import SelectInput from './inputs/SelectInput.vue'
const { currentLang, setLanguage } = useI18n()

const onLanguageChange = (lang: string) => {
  setLanguage(lang as any)
}

// Make sure the select reacts to changes in currentLang from elsewhere
watch(currentLang, newLang => {
  currentLangRef.value = newLang
})

const currentLangRef = ref(currentLang.value)
</script>
<template>
  <div class="mb-4">
    <SelectInput
      v-model="currentLang"
      :options="languages"
      size="small"
      placeholder="Select Language"
      @update:value="onLanguageChange"
    />
  </div>
</template>
