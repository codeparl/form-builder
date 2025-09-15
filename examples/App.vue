<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Form Builder Playground</h1>

    <!-- 👇 use your FormBuilder component -->
    <FormBuilder />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormBuilder from '../src/components/FormBuilder.vue'

// Example fields you might later design
const fields = ref([
  { id: 'name', type: 'text', label: 'Name', required: true },
  { id: 'email', type: 'email', label: 'Email', required: true },
  { id: 'message', type: 'textarea', label: 'Message' },
])

function handleSubmit(data: Record<string, any>) {
  console.log('Form submitted:', data)
}
</script>

<style scoped>
/* playground-only styles */
body {
  background-color: #f9fafb;
}
</style>
