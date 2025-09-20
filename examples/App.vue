<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Form Builder Playground</h1>

    <FormRenderer :sections="formData" />
  </div>
</template>

<script setup lang="ts">
import FormBuilder from '../src/components/FormBuilder.vue'
import formData from './form-data.json'
import FormRenderer from '../src/components/FormRenderer.vue'

const options = {
  language: 'en',
  allowExport: false,
  allowImport: false,
}

const saveData = (sections: any) => {
  console.log(sections.value)
}
</script>

<style scoped>
/* playground-only styles */
body {
  background-color: #f9fafb;
}
</style>
