<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import type { FormField } from '../types/fields'

const props = defineProps<{
  formFields: FormField[]
}>()

const emit = defineEmits(['clear', 'save'])

const showJson = ref(false)
const message = useMessage()

const formattedJson = computed(() => JSON.stringify(props.formFields, null, 2))

const onClear = () => {
  emit('clear')
  message.warning('All fields cleared!')
}

const onViewJson = () => {
  showJson.value = true
}

const onSave = () => {
  emit('save', props.formFields)
  message.success('Form saved successfully!')
}
</script>
<template>
  <div
    class="flex items-center justify-between p-2 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 rounded-t-lg"
  >
    <!-- Left: Title -->
    <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200">Form Builder</h3>

    <!-- Right: Actions -->
    <div class="flex items-center gap-2">
      <!-- Clear All -->
      <n-button size="small" type="error" ghost @click="onClear"> Clear All </n-button>

      <!-- View JSON -->
      <n-button size="small" type="info" ghost @click="onViewJson"> View JSON </n-button>

      <!-- Save -->
      <n-button size="small" type="primary" @click="onSave"> Save </n-button>
    </div>
  </div>

  <!-- Modal to display JSON -->
  <n-modal v-model:show="showJson" preset="card" title="Form Data JSON">
    <pre class="text-sm bg-gray-900 text-green-300 p-3 rounded overflow-x-auto">
      {{ formattedJson }}
    </pre>
  </n-modal>
</template>
