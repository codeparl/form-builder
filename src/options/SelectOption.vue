<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormField } from '@/types/fields'

const props = defineProps<{
  field?: FormField
}>()

const emit = defineEmits<{
  (e: 'update', field: FormField): void
}>()

const name = ref('')
const options = ref<string>('') // comma-separated options
const helpText = ref('')
const cssClass = ref('')

watch(
  () => props.field,
  f => {
    if (f) {
      name.value = f.name || ''
      options.value = (f.options || []).join(',')
      helpText.value = f.helpText || ''
      cssClass.value = f.class || ''
    }
  },
  { immediate: true }
)

const updateField = () => {
  if (!props.field) return
  emit('update', {
    ...props.field,
    name: name.value,
    options: options.value.split(',').map(o => o.trim()),
    helpText: helpText.value,
    class: cssClass.value,
  })
}
</script>

<template>
  <div class="p-4 space-y-3 bg-gray-50 dark:bg-gray-800 rounded shadow-md w-full max-w-sm">
    <h3 class="font-semibold text-gray-700 dark:text-gray-200">Select Field Options</h3>

    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Name</label>
      <input
        type="text"
        v-model="name"
        @input="updateField"
        class="w-full border rounded p-1 dark:bg-gray-700 dark:text-gray-200"
      />
    </div>

    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Options (comma separated)</label>
      <input
        type="text"
        v-model="options"
        @input="updateField"
        class="w-full border rounded p-1 dark:bg-gray-700 dark:text-gray-200"
      />
    </div>

    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Help Text</label>
      <input
        type="text"
        v-model="helpText"
        @input="updateField"
        class="w-full border rounded p-1 dark:bg-gray-700 dark:text-gray-200"
      />
    </div>

    <div>
      <label class="block text-sm text-gray-600 dark:text-gray-300">Class</label>
      <input
        type="text"
        v-model="cssClass"
        @input="updateField"
        class="w-full border rounded p-1 dark:bg-gray-700 dark:text-gray-200"
      />
    </div>
  </div>
</template>
