<script setup lang="ts">
import { ref, toRef } from 'vue'
import draggable from 'vuedraggable'
import FieldItem from './FieldItem.vue'
import type { FormField, FormSection } from '@/types/fields'
import { useDragAndDrop } from '@/composable/useDragAndDrop'
import { useI18n } from '@/i18n/useI18n'
import lock from 'vue-material-design-icons/Lock.vue'
import Modal from '@/components/Modal.vue'
import { useFormBuilderTheme } from '@/store/theme'
import ButtonInput from './inputs/ButtonInput.vue'

const theme = useFormBuilderTheme()

// ---------------- Props & Emits ----------------
const props = defineProps<{
  section: FormSection
  sectionIndex: number
}>()

const emit = defineEmits(['update:section', 'delete-section', 'edit-field'])

// ---------------- I18n ----------------
const { t } = useI18n()

// ---------------- State ----------------
const collapsed = ref(!props.section.editable)
const showEditPanel = ref(false)
const sectionRef = toRef(props, 'section')

// ---------------- Drag & Drop ----------------
const { onDragStart, onDragEnd, onMove, moveFieldUp, moveFieldDown, duplicateField, editField } =
  useDragAndDrop(sectionRef)

// ---------------- Editing ----------------
const onEditField = (field: FormField, fieldIndex: number) => {
  emit('edit-field', field, props.sectionIndex, fieldIndex)
}

const saveSectionDetails = () => {
  emit('update:section', { ...props.section })
  showEditPanel.value = false
}

const clearFields = () => {
  props.section.fields = props.section.fields.filter(f => f.editable === false)
  emit('update:section', props.section)
}
const showSection = () => {
  props.section.open = !props.section.open
}
</script>

<template>
  <div
    :class="[
      theme.darkMode ? 'bg-neutral-900 border-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700 border-gray-300',
    ]"
    class="p-2 rounded-md border"
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center gap-2">
        <ButtonInput size="tiny" :is-outline="true" class="text-sm !text-gray-300 cursor-pointer" @click="showSection">
          <chevron-right-icon v-if="!props.section.open" class="w-4 h-4" />
          <chevron-down-icon v-else class="w-4 h-4" />
        </ButtonInput>
        <h3>{{ props.section.title || `Section ${props.sectionIndex + 1}` }}</h3>
      </div>

      <div class="flex gap-2">
        <lock v-if="!props.section.editable" title="Section locked" class="w-4 h-4 text-orange-500" />
        <ButtonInput
          v-if="props.section.editable"
          class="!bg-transparent !border-0"
          title="Edit details"
          size="tiny"
          @click="showEditPanel = true"
        >
          <edit-icon class="w-4 h-4" />
        </ButtonInput>

        <ButtonInput
          class="!bg-transparent !text-yellow-600 !border-0"
          title="Clear all fields"
          size="tiny"
          type="warning"
          @click="clearFields"
        >
          <delete-sweep-icon class="w-4 h-4" />
        </ButtonInput>

        <ButtonInput
          class="!bg-transparent !text-red-600 !border-0"
          title="Delete section"
          size="tiny"
          type="error"
          v-if="props.section.editable"
          @click="emit('delete-section', props.sectionIndex)"
        >
          <delete-icon class="w-4 h-4" />
        </ButtonInput>
      </div>
    </div>

    <!-- Description -->
    <p v-if="props.section.description" class="text-sm text-gray-600 mb-2">
      {{ props.section.description }}
    </p>

    <!-- Fields -->
    <transition name="slide-toggle">
      <div
        v-show="props.section.open"
        :class="[theme.darkMode ? 'border-gray-800' : 'bg-white']"
        class="rounded border relative p-2"
      >
        <div
          v-if="props.section.fields.length === 0"
          class="no-fields-message text-center w-full h-full flex flex-col justify-center top-0 bottom-0 absolute text-2xl text-gray-800"
        >
          <div>{{ t('canvas.placeholder') }}</div>
        </div>

        <draggable
          v-model="props.section.fields"
          :group="{ name: 'fields', pull: false, put: props.section.editable }"
          item-key="id"
          tag="div"
          chosen-class="drop-chosen"
          drag-class="drop-dragging"
          :ghost-class="[theme.darkMode ? 'drop-placeholder-dark' : 'drop-placeholder']"
          class="flex flex-col drop-area gap-2"
          :animation="300"
          :force-fallback="true"
          :fallback-on-body="true"
          @start="onDragStart"
          @move="onMove"
          @end="onDragEnd"
        >
          <template #item="{ element: field, index: fieldIndex }">
            <FieldItem
              :element="field"
              :section="props.section"
              :index="fieldIndex"
              @move-up="moveFieldUp(fieldIndex)"
              @move-down="moveFieldDown(fieldIndex)"
              @duplicate="duplicateField(fieldIndex)"
              @edit="onEditField(field, fieldIndex)"
              @delete="props.section.fields.splice(fieldIndex, 1)"
            />
          </template>
        </draggable>
      </div>
    </transition>

    <!-- Section Edit Modal -->
    <Modal v-model="showEditPanel" title="Edit Section" width="45rem" max-width="75vw">
      <div class="flex flex-col gap-3">
        <TextInput v-model="props.section.title" placeholder="Section Title" size="small" />
        <TextareaInput v-model="props.section.description" placeholder="Section Description" size="small" />
        <div class="flex justify-end gap-2">
          <ButtonInput
            :is-outline="true"
            size="medium"
            class="text-green-700 border-green-700"
            @click="showEditPanel = false"
          >
            Cancel
          </ButtonInput>
          <ButtonInput size="medium" type="success" @click="saveSectionDetails"> Save </ButtonInput>
        </div>
      </div>
    </Modal>
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
  max-height: 1000px;
  opacity: 1;
}
</style>
