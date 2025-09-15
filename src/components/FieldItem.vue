<script setup lang="ts">
import { computed } from 'vue'
import type { FormField } from '@/types/fields'
import { fieldComponentMap } from '@/components/fields/componentMap'
const props = defineProps<{
  element: FormField
  index: number
}>()

defineEmits<{
  (e: 'delete', index: number): void
  (e: 'move-up', index: number): void
  (e: 'move-down', index: number): void
  (e: 'duplicate', field: FormField, index: number): void
  (e: 'edit', field: FormField, index: number): void
}>()

// resolve field component based on its type
const fieldComponent = computed(() => fieldComponentMap[props.element.type])
</script>

<template>
  <div class="rounded border bg-gray-50 dark:bg-gray-900 shadow-sm">
    <!-- Toolbar/Header -->
    <div
      class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700"
    >
      <span class="text-sm field-label font-medium text-gray-600 dark:text-gray-300"> {{ element.label }} </span>

      <div class="flex field-actions text-sm space-x-2">
        <!-- Move up -->
        <button class="text-sm text-gray-500 cursor-pointer hover:text-blue-600" @click="$emit('move-up', index)">
          <arrow-up />
        </button>
        <!-- Move down -->
        <button class="p-1 cursor-pointer text-gray-500 hover:text-blue-600" @click="$emit('move-down', index)">
          <arrow-down />
        </button>
        <!-- Duplicate -->
        <button
          class="p-1 text-gray-500 cursor-pointer hover:text-green-600"
          @click="$emit('duplicate', element, index)"
        >
          <duplicate-icon />
        </button>
        <!-- Edit -->
        <button class="p-1 text-gray-500 cursor-pointer hover:text-indigo-600" @click="$emit('edit', element, index)">
          <edit-icon />
        </button>
        <!-- Delete -->
        <button class="p-1 text-gray-500 cursor-pointer hover:text-red-600" @click="$emit('delete', index)">
          <delete-icon />
        </button>
      </div>
    </div>

    <!-- Field Content -->
    <ul class="p-3 cursor-move bg-white">
      <li>
        <component :is="fieldComponent" v-bind="{ field: element }" />
      </li>
    </ul>
  </div>
</template>
