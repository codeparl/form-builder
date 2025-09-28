<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { FormField, FormSection } from '@/types/fields'
import { fieldComponentMap } from '@/components/fields/componentMap'
import { useI18n } from '@/i18n/useI18n'
import { dialog } from '@/plugins/dialog'
import { useFormBuilderTheme } from '@/store/theme'
const theme = useFormBuilderTheme()
const { t } = useI18n()
const props = defineProps<{
  element: FormField
  index: number
  section: FormSection
}>()

const emit = defineEmits<{
  (e: 'delete', index: number): void
  (e: 'move-up', index: number): void
  (e: 'move-down', index: number): void
  (e: 'duplicate', field: FormField, index: number): void
  (e: 'edit', field: FormField, index: number): void
}>()

const fieldComponent = computed(() => fieldComponentMap[props.element.type])

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

watch(
  editableField,
  val => {
    if (val) {
      Object.assign(props.element, val)
    }
  },
  { deep: true }
)

// Confirm delete using custom dialog
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
  <div
    :class="[theme.darkMode ? 'bg-neutral-900 border-gray-800 dark ' : 'border-gray-400 bg-white']"
    class="rounded border shadow-md ub-vue-form-builder ub dragged"
  >
    <!-- Toolbar/Header -->
    <div
      class="flex items-center cursor-move justify-between p-2 border-b"
      :class="[theme.darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-400 text-gray-300']"
    >
      <span class="text-sm field-label font-medium">
        {{ t('field.' + (element.subType || element.type)) }}
        <span class="text-gray-00">&mdash; {{ element.id }}</span>
      </span>

      <div class="flex field-actions text-sm space-x-2">
        <button class="text-sm cursor-pointer hover:text-blue-600" @click="$emit('move-up', index)">
          <arrow-up />
        </button>
        <button class="p-1 cursor-pointer hover:text-blue-600" @click="$emit('move-down', index)">
          <arrow-down />
        </button>
        <button
          v-if="section.editable"
          class="p-1 cursor-pointer hover:text-green-600"
          @click="$emit('duplicate', editableField, index)"
        >
          <duplicate-icon />
        </button>
        <button
          v-if="section.editable"
          class="p-1 cursor-pointer hover:text-indigo-600"
          @click="$emit('edit', editableField, index)"
        >
          <edit-icon />
        </button>
        <button v-if="section.editable" class="p-1 cursor-pointer hover:text-red-600" @click="confirmDelete">
          <delete-icon />
        </button>
      </div>
    </div>

    <!-- Field Content -->
    <ul class="p-3 cursor-move">
      <li class="w-full">
        <component :is="fieldComponent" v-model:value="editableField" />
      </li>
    </ul>
  </div>
</template>
