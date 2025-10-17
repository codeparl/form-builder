<template>
  <div class="p-6 w-[75%] mx-auto">
    <h1 class="text-2xl font-bold mb-4">Form Builder Playground</h1>

    <!-- Correct: FormRenderer expects "sections" prop
    <FormRenderer :sections="sections" /> -->

    <!-- Uncomment if you want to test FormBuilder -->
    <!---->
    <FormBuilder :options="options" :is-dark-mode="true" @save="saveData" />

  </div>
</template>

<script setup lang="ts">
import FormRenderer from '../src/components/FormRenderer.vue'
import FormBuilder from '../src/components/FormBuilder.vue' // ✅ fixed typo
import formData from './form-data.json'

const sections = formData

const options = {
  language: 'en',
  allowExport: false,
  showThemeToggleBtn: true,
  allowImport: false,
  allowViewSchema: true,
  showSaveBtn: true,
}

const saveData = (sections: any) => {
  console.log('Saved sections:', sections)
}
</script>

<style scoped>
/* playground-only styles */
body {
  background-color: #f9fafb;
}
</style>
