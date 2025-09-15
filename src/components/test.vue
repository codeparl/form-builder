<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import type { SortableEvent } from 'sortablejs'
interface FieldType {
  type: string
  label: string
}

interface FormField extends FieldType {
  id: string
}

const fieldTypes: FieldType[] = [
  { type: 'text', label: 'Text Input' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'select', label: 'Select Dropdown' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'radio', label: 'Radio Group' },
]

const formFields = ref<FormField[]>([])

// typed clone function ✅
const cloneField = (el: FieldType): FormField => ({
  ...el,
  id: Date.now().toString() + Math.random().toString(36).slice(2),
})

const canDrop = ref<Boolean>(false)

const onDragStart = (evt: SortableEvent) => {
  canDrop.value = false
  console.log('Drag started', evt)
}

const onDragEnd = (evt: SortableEvent) => {
  canDrop.value = true
  const canvasEl = document.querySelector('#drop-canvas')
  const target = evt.explicitOriginalTarget
  const rawData = evt.item.dataset.field

  if (rawData && target.id == canvasEl?.id) {
    const field = JSON.parse(rawData)
    formFields.value.splice(evt.newIndex, 0, field)
    console.log('Drag ended', evt, rawData)
  }
}
let isHovering = ref(false)
const onMoveCallback = (evt: any) => {
  console.log(evt)
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Sidebar -->
    <aside class="w-1/4 border-r border-gray-200 dark:border-gray-700 p-4">
      <h2 class="text-lg font-semibold mb-4">Field Types</h2>
      <draggable
        :list="fieldTypes"
        :group="{ name: 'fields', pull: 'clone', put: false }"
        item-key="type"
        :clone="cloneField"
        :chosen-class="'drag-chosen'"
        :sort="true"
        class="space-y-2 droped"
        :animation="200"
        @start="onDragStart"
        @end="onDragEnd"
        @move="onMoveCallback"
        :ghost-class="'draggable-ghost'"
      >
        <template #item="{ element }">
          <div
            :data-field="JSON.stringify(element)"
            class="cursor-move rounded bg-white dark:bg-gray-800 p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            {{ element.label }}
          </div>
        </template>
      </draggable>
    </aside>

    <!-- Canvas -->
    <main class="flex-1 p-6">
      <h2 :class="[canDrop ? 'text-red-600' : '']" class="text-lg font-semibold mb-4">Form Canvas</h2>
      <draggable
        id="drop-canvas"
        v-model="formFields"
        :group="{ name: 'fields', pull: false, put: canDrop }"
        item-key="id"
        class="min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col gap-3 bg-white dark:bg-gray-800 snap-y snap-mandatory overflow-y-auto"
        :animation="300"
        :class="{ '!bg-blue-700': isHovering }"
      >
        <template #item="{ element, index }">
          <div
            class="p-3 duration-500 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 snap-start transition-transform"
          >
            {{ index + 1 }}. {{ element.label }}
          </div>
        </template>
      </draggable>
    </main>
  </div>
</template>

<style scoped>
/* Optional: add pointer cursor during drag */
.draggable-ghost {
  opacity: 1;
  background-color: red;
  transition: transform 0.2s ease;
}

.drag-chosen {
  opacity: 1; /* dim original element while dragging */
  border: 2px solid #6366f1;
  background-color: #e0e7ff;
}
</style>
