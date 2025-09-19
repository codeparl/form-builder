<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Form Builder Playground</h1>

    <!-- 👇 use your FormBuilder component -->
    <FormBuilder :options="options" />
  </div>
</template>

<script setup lang="ts">
import FormBuilder from '../src/components/FormBuilder.vue'

const options = {
  language: 'en',
}
</script>

<style scoped>
/* playground-only styles */
body {
  background-color: #f9fafb;
}
</style>
