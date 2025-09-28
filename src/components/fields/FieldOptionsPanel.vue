<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormField, FieldCategory } from '@/types/fields'
import { useI18n } from '@/i18n/useI18n'
import { fieldOptions } from '@/components/fields/fieldOptionComponents'

import Drawer from '@/components/Drawer.vue'
import ButtonInput from '@/components/inputs/ButtonInput.vue'
import FormWrapper from '../FormWrapper.vue'
import { useFormBuilderTheme } from '@/store/theme'
const theme = useFormBuilderTheme()
const { t } = useI18n()

// Props
const props = defineProps<{
  field: FormField | null
  show: boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'update', field: FormField): void
  (e: 'close'): void
}>()

// Local editable copy
const editableField = ref<FormField | null>(null)

// Sync props.field → editable copy
watch(
  () => props.field,
  newField => {
    editableField.value = newField ? { ...newField } : null
  },
  { immediate: true }
)

// Save changes
const onSave = () => {
  if (editableField.value) {
    emit('update', { ...editableField.value })
  }
  emit('close')
}

// Cancel editing
const onCancel = () => {
  emit('close')
}
</script>

<template>
  <Drawer :show="props.show" placement="right" width="400px">
    <FormWrapper>
      <div v-if="editableField" class="flex flex-col h-full">
        <!-- Header -->
        <div class="bg-green-700 text-gray-100 p-2 text-md">
          {{ t('Edit') }}: {{ editableField.label }} — {{ editableField.id }}
        </div>

        <!-- Content -->
        <div class="p-2 px-4 flex-1 overflow-y-auto">
          <!-- Only render general fields if not hidden -->
          <template v-if="editableField.category !== 'hidden'">
            <!-- Required -->
            <div v-if="!['button', 'html', 'layout'].includes(editableField.category as FieldCategory)" class="mb-3">
              <CheckboxInput :label="t('field.required')" v-model="editableField.required" />
            </div>

            <!-- Name -->
            <div v-if="!['html', 'layout'].includes(editableField.category as FieldCategory)" class="mb-3">
              <label class="block text-sm font-medium mb-1">
                {{ t('field.name') }}
              </label>
              <TextInput
                v-model="editableField.name"
                class="w-full border rounded p-2 text-sm"
                placeholder="Enter field name"
              />
            </div>

            <!-- Label -->
            <div v-if="!['layout'].includes(editableField.category as FieldCategory)" class="mb-3">
              <label class="block text-sm font-medium mb-1">
                {{ t('field.label') }}
              </label>
              <TextInput
                v-model="editableField.label"
                class="w-full border rounded p-2 text-sm"
                placeholder="Enter field label"
              />
            </div>

            <!-- Placeholder -->
            <div v-if="!['button', 'html', 'layout'].includes(editableField.category as FieldCategory)" class="mb-3">
              <label class="block text-sm font-medium mb-1">
                {{ t('field.placeholder') }}
              </label>
              <TextInput
                v-model="editableField.placeholder"
                class="w-full border rounded p-2 text-sm"
                placeholder="Enter placeholder text"
              />
            </div>

            <!-- Help Text -->
            <div v-if="!['button', 'html', 'layout'].includes(editableField.category as FieldCategory)" class="mb-3">
              <label class="block text-sm font-medium mb-1">
                {{ t('field.helpText') }}
              </label>
              <TextInput
                v-model="editableField.helpText"
                class="w-full border rounded p-2 text-sm"
                placeholder="Enter help text"
              />
            </div>

            <!-- Class -->
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1">
                {{ t('field.class') }}
              </label>
              <TextInput
                v-model="editableField.class"
                class="w-full border rounded p-2 text-sm"
                placeholder="Add custom CSS class"
              />
            </div>
          </template>

          <!-- Hidden field: only name & value -->
          <template v-else>
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1">
                {{ t('field.name') }}
              </label>
              <TextInput
                v-model="editableField.name"
                class="w-full border rounded p-2 text-sm"
                placeholder="Enter hidden field name"
              />
            </div>

            <div class="mb-3">
              <label class="block text-sm font-medium mb-1">
                {{ t('field.value') }}
              </label>
              <TextInput
                v-model="editableField.value"
                class="w-full border rounded p-2 text-sm"
                placeholder="Enter hidden field value"
              />
            </div>
          </template>

          <!-- Field-specific options -->
          <component
            v-if="editableField.type && fieldOptions[editableField.type]"
            :is="fieldOptions[editableField.type]"
            v-model:value="editableField"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end items-center mt-4 gap-2 p-2 border-t">
          <ButtonInput type="success" :is-outline="true" size="medium" @click="onCancel">{{ t('Cancel') }}</ButtonInput>
          <ButtonInput size="medium" type="success" @click="onSave">{{ t('Save') }}</ButtonInput>
        </div>
      </div>
    </FormWrapper>
  </Drawer>
</template>
