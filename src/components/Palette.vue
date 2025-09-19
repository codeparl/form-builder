<script setup lang="ts">
import { defineProps } from 'vue'
import draggable from 'vuedraggable'
import { useI18n } from '@/i18n/useI18n'

const props = defineProps<{
  fieldTypes: any[]
  cloneField: (el: any) => any
}>()

const { t } = useI18n()
</script>

<template>
  <draggable
    :list="props.fieldTypes"
    :group="{ name: 'fields', pull: 'clone', put: false }"
    item-key="type"
    :clone="cloneField"
    :sort="false"
    tag="ul"
    class="cursor-move w-full m-0 p-0 flex flex-col gap-0 border border-gray-400 rounded bg-white dark:bg-gray-800 shadow-md"
    :animation="300"
    drag-class="dragging"
    chosen-class="drag-chosen"
    ghost-class="drag-placeholder"
    :force-fallback="true"
    :fallback-on-body="true"
  >
    <template #item="{ element }">
      <li
        :key="element.type"
        class="flex items-center border-b bg-white border-gray-400 py-[9px] px-2 gap-2 my-0 cursor-move hover:bg-gray-100"
      >
        <component :is="element.icon" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span>{{ t(`field.${element.type}`) }}</span>
      </li>
    </template>
  </draggable>
</template>
