<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import draggable from 'vuedraggable'
import { useI18n } from '@/i18n/useI18n'
import { useFormBuilderTheme } from '@/store/theme'

// theme state
const theme = useFormBuilderTheme()

// props
const props = defineProps<{
  fieldTypes: any[]
  cloneField: (el: any) => any
}>()

// emits
const emit = defineEmits<{
  (e: 'start', evt: any): void
  (e: 'move', evt: any): void
  (e: 'end', evt: any): void
}>()

const { t } = useI18n()

// forward events
const onDragStart = (evt: any) => emit('start', evt)
const onMove = (evt: any) => emit('move', evt)
const onDragEnd = (evt: any) => emit('end', evt)
</script>

<template>
  <draggable
    :list="props.fieldTypes"
    :group="{ name: 'fields', pull: 'clone', put: false }"
    item-key="type"
    :clone="props.cloneField"
    :sort="false"
    tag="ul"
    :class="[
      theme.darkMode ? 'border-gray-800 text-gray-400 bg-neutral-900' : 'border-gray-400 text-gray-800 bg-white',
    ]"
    class="cursor-move w-full m-0 ub p-0 flex flex-col gap-0 border rounded shadow-md"
    :animation="300"
    drag-class="dragging"
    chosen-class="drag-chosen"
    ghost-class="drag-placeholder"
    :force-fallback="true"
    :fallback-on-body="true"
    @start="onDragStart"
    @move="onMove"
    @end="onDragEnd"
  >
    <template #item="{ element }">
      <li
        :key="element.type"
        :class="[theme.darkMode ? 'hover:bg-neutral-800 border-gray-800 dark' : 'hover:bg-gray-100 border-gray-400']"
        class="flex items-center border-b py-[9px] ub px-2 gap-2 my-0 cursor-move"
      >
        <component :is="element.icon" class="w-5 h-5" />
        <span>{{ t(`field.${element.type}`) }}</span>
      </li>
    </template>
  </draggable>
</template>

<style scoped>
.dragging {
  opacity: 0.6;
  background-color: rgba(59, 130, 246, 0.2);
  border: 2px dashed #3b82f6;
}
.dragging {
  background-color: aquamarine;
}
</style>
