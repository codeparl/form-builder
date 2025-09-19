<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDialog } from 'naive-ui'
import type { FormField } from '@/types/fields'
import { fieldComponentMap } from '@/components/fields/componentMap'
import { useI18n } from '@/i18n/useI18n'

const { t } = useI18n()
const props = defineProps<{
  element: FormField
  index: number
}>()

const emit = defineEmits<{
  (e: 'delete', index: number): void
  (e: 'move-up', index: number): void
  (e: 'move-down', index: number): void
  (e: 'duplicate', field: FormField, index: number): void
  (e: 'edit', field: FormField, index: number): void
}>()

const fieldComponent = computed(() => fieldComponentMap[props.element.type])
const dialog = useDialog()

// --- Local editable copy ---
const editableField = ref<FormField>({ ...props.element })

// Watch props.element → update local copy
watch(
  () => props.element,
  newVal => {
    if (newVal) editableField.value = { ...newVal }
  },
  { immediate: true, deep: true }
)

// Watch local editableField → propagate changes to parent element
watch(
  editableField,
  val => {
    if (val) {
      // update original element directly
      Object.assign(props.element, val)
    }
  },
  { deep: true }
)

// Confirm delete
const confirmDelete = () => {
  dialog.warning({
    title: 'Confirm Delete',
    content: `Are you sure you want to delete this "${t('field.' + props.element.type)}"?`,
    positiveText: 'Yes, delete',
    negativeText: 'Cancel',
    onPositiveClick: () => emit('delete', props.index),
  })
}
</script>

<template>
  <div class="rounded border border-gray-400 bg-white shadow-md">
    <!-- Toolbar/Header -->
    <div class="flex items-center cursor-move justify-between p-2 border-b border-gray-400 dark:border-gray-700">
      <span class="text-sm field-label font-medium text-gray-600 dark:text-gray-300">
        {{ t('field.' + element.type) }} <span class="text-gray-400">&mdash; {{ element.id }}</span>
      </span>

      <div class="flex field-actions text-sm space-x-2">
        <button class="text-sm text-gray-300 cursor-pointer hover:text-blue-600" @click="$emit('move-up', index)">
          <arrow-up />
        </button>
        <button class="p-1 cursor-pointer text-gray-300 hover:text-blue-600" @click="$emit('move-down', index)">
          <arrow-down />
        </button>
        <button
          class="p-1 text-gray-300 cursor-pointer hover:text-green-600"
          @click="$emit('duplicate', editableField, index)"
        >
          <duplicate-icon />
        </button>
        <button
          class="p-1 text-gray-300 cursor-pointer hover:text-indigo-600"
          @click="$emit('edit', editableField, index)"
        >
          <edit-icon />
        </button>
        <button class="p-1 text-gray-300 cursor-pointer hover:text-red-600" @click="confirmDelete">
          <delete-icon />
        </button>
      </div>
    </div>

    <!-- Field Content -->
    <ul class="p-3 cursor-move bg-white">
      <li>
        <component :is="fieldComponent" v-model:value="editableField" />
      </li>
    </ul>
  </div>
</template>
