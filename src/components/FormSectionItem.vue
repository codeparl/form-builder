<script setup lang="ts">
import { ref, toRef } from 'vue'
import draggable from 'vuedraggable'
import FieldItem from './FieldItem.vue'
import type { FormField, FormSection } from '@/types/fields'
import { useDragAndDrop } from '@/composable/useDragAndDrop'
import { useI18n } from '@/i18n/useI18n'

// Props & emits
const props = defineProps<{
  section: FormSection
  sectionIndex: number
}>()

const { t } = useI18n()
const emit = defineEmits(['update:section', 'delete-section', 'edit-field'])

// Collapsed & edit panel
const collapsed = ref(!props.section.editable)
const showEditPanel = ref(false)
const sectionRef = toRef(props, 'section')
// Inject composable
const { moveFieldUp, moveFieldDown, duplicateField } = useDragAndDrop(sectionRef)

// Emit field edits upward
const onEditField = (field: FormField, fieldIndex: number) => {
  emit('edit-field', field, props.sectionIndex, fieldIndex)
}

// Save section updates
const saveSectionDetails = () => {
  emit('update:section', { ...props.section })
  showEditPanel.value = false
}

// Clear all fields
const clearFields = () => {
  props.section.fields.filter(f => f.editable == true).splice(0, props.section.fields.length)

  emit('update:section', props.section)
}
</script>

<template>
  <div class="p-2 bg-gray-100 rounded-md border border-gray-300">
    <!-- Header -->
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center gap-2">
        <!-- Collapse Icon (plus/minus) -->
        <button class="text-sm cursor-pointer text-gray-700" @click="collapsed = !collapsed">
          <chevron-right-icon v-if="collapsed" class="w-4 h-4" />
          <chevron-down-icon v-else class="w-4 h-4" />
        </button>
        <h3>{{ props.section.title || `Section ${props.sectionIndex + 1}` }}</h3>
      </div>
      <div class="flex gap-2">
        <n-button
          class="!bg-transparent !border-0"
          tertiary
          v-if="props.section.editable"
          title="Edit details"
          size="tiny"
          @click="showEditPanel = true"
        >
          <edit-icon class="w-4 h-4" />
        </n-button>
        <n-button
          class="!bg-transparent !border-0"
          title="Clear all fields"
          size="tiny"
          type="warning"
          tertiary
          @click="clearFields"
        >
          <delete-sweep-icon class="w-4 h-4" />
        </n-button>
        <n-button
          class="!bg-transparent !border-0"
          title="Delete section"
          size="tiny"
          type="error"
          v-if="props.section.editable"
          tertiary
          @click="emit('delete-section', props.sectionIndex)"
        >
          <delete-icon class="w-4 h-4" />
        </n-button>
      </div>
    </div>

    <!-- Description -->
    <p v-if="props.section.description" class="text-sm text-gray-600 mb-2">
      {{ props.section.description }}
    </p>

    <!-- Fields -->
    <transition name="slide-toggle">
      <div v-show="!collapsed" class="bg-white rounded border border-gray-300 relative p-2">
        <div
          v-if="props.section.fields.length == 0"
          class="no-fields-message text-center w-full h-full flex flex-col justify-center top-0 bottom-0 absolute text-2xl text-gray-800"
        >
          <div class="text-gray-500">{{ t('canvas.placeholder') }}</div>
        </div>

        <draggable
          v-model="props.section.fields"
          :group="{ name: 'fields', pull: false, put: true }"
          item-key="id"
          tag="ul"
          chosen-class="drop-chosen"
          ghost-class="drop-placeholder"
          class="flex flex-col drop-area gap-2"
          :animation="300"
          @end="emit('update:section', props.section)"
        >
          <template #item="{ element: field, index: fieldIndex }">
            <FieldItem
              :element="field"
              :index="fieldIndex"
              @move-up="moveFieldUp(fieldIndex)"
              @move-down="moveFieldDown(fieldIndex)"
              @duplicate="duplicateField(field, fieldIndex)"
              @edit="onEditField(field, fieldIndex)"
              @delete="props.section.fields.splice(fieldIndex, 1)"
            />
          </template>
        </draggable>
      </div>
    </transition>

    <!-- Section Edit Modal -->
    <n-modal v-model:show="showEditPanel" style="width: 45rem; max-width: 75vw" preset="card" title="Edit Section">
      <div class="flex flex-col gap-3">
        <n-input v-model:value="props.section.title" placeholder="Section Title" size="small" />
        <n-input
          v-model:value="props.section.description"
          type="textarea"
          placeholder="Section Description"
          size="small"
        />
        <div class="flex justify-end gap-2">
          <n-button size="small" @click="showEditPanel = false"> Cancel </n-button>
          <n-button size="small" type="primary" @click="saveSectionDetails"> Save </n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>
<style scoped>
.slide-toggle-enter-active,
.slide-toggle-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease,
    padding 0.3s ease;
  overflow: hidden;
}

.slide-toggle-enter-from,
.slide-toggle-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.slide-toggle-enter-to,
.slide-toggle-leave-from {
  max-height: 1000px; /* large enough to fit content */
  opacity: 1;
}
</style>
