<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FormField, FieldCategory } from '@/types/fields'
import { useI18n } from '@/i18n/useI18n'
import { fieldOptions } from '@/components/fields/fieldOptionComponents'

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
  <n-drawer v-model:show="props.show" placement="right" width="400px" class="p-0">
    <n-form label-placement="top" v-if="editableField">
      <!-- Header -->
      <div class="bg-green-700 text-gray-100 p-2 text-md">
        {{ t('Edit') }}: {{ editableField.label }} — {{ editableField.id }}
      </div>

      <div class="p-2 px-4">
        <!-- Only render general fields if not hidden -->
        <template v-if="editableField.category !== 'hidden'">
          <!-- Required -->
          <n-form-item
            v-if="!['button', 'html', 'layout'].includes(editableField.category as FieldCategory)"
            :label="t('field.required')"
          >
            <n-checkbox v-model:checked="editableField.required">
              {{ t('Required') }}
            </n-checkbox>
          </n-form-item>

          <!-- Name -->
          <n-form-item
            v-if="!['html', 'layout'].includes(editableField.category as FieldCategory)"
            :label="t('field.name')"
          >
            <n-input v-model:value="editableField.name" placeholder="Enter field name" />
          </n-form-item>

          <!-- Label -->
          <n-form-item v-if="!['layout'].includes(editableField.category as FieldCategory)" :label="t('field.label')">
            <n-input v-model:value="editableField.label" placeholder="Enter field label" />
          </n-form-item>

          <!-- Placeholder -->
          <n-form-item
            v-if="!['button', 'html', 'layout'].includes(editableField.category as FieldCategory)"
            :label="t('field.placeholder')"
          >
            <n-input v-model:value="editableField.placeholder" placeholder="Enter placeholder text" />
          </n-form-item>

          <!-- Help Text -->
          <n-form-item
            v-if="!['button', 'html', 'layout'].includes(editableField.category as FieldCategory)"
            :label="t('field.helpText')"
          >
            <n-input v-model:value="editableField.helpText" placeholder="Enter help text" />
          </n-form-item>

          <!-- Class -->
          <n-form-item :label="t('field.class')">
            <n-input v-model:value="editableField.class" placeholder="Add custom CSS class" />
          </n-form-item>
        </template>

        <!-- Hidden field: only name & value -->
        <template v-else>
          <n-form-item :label="t('field.name')">
            <n-input v-model:value="editableField.name" placeholder="Enter hidden field name" />
          </n-form-item>

          <n-form-item :label="t('field.value')">
            <n-input v-model:value="editableField.value" placeholder="Enter hidden field value" />
          </n-form-item>
        </template>

        <!-- Field-specific options (works for both hidden and other types) -->
        <component
          v-if="editableField.type && fieldOptions[editableField.type]"
          :is="fieldOptions[editableField.type]"
          v-model:value="editableField"
        />
      </div>
    </n-form>

    <!-- Actions -->
    <div class="flex justify-end mt-4 gap-2 p-2" v-if="editableField">
      <n-button @click="onCancel">{{ t('Cancel') }}</n-button>
      <n-button type="primary" @click="onSave">{{ t('Save') }}</n-button>
    </div>
  </n-drawer>
</template>
