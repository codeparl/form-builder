<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Form Builder Playground</h1>

    <FormBuilder :options="options" :is-dark-mode="true" @save="saveData" />
  </div>
</template>

<script setup lang="ts">
import FormBuilder from '../src/components/FormBuilder.vue'
import formData from './form-data.json'

const options = {
  language: 'en',
  allowExport: false,
  showThemeToggleBtn: true,
  allowImport: false,
  allowViewSchema: false,
  showSaveBtn: true,
}

const saveData = (sections: any) => {}
</script>

<style scoped>
/* playground-only styles */
body {
  background-color: #f9fafb;
}
</style>
