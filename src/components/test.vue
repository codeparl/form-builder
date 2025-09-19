<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import draggable from 'vuedraggable'
import type { SortableEvent } from 'sortablejs'
import { useI18n } from '@/i18n/useI18n'
import { fieldTypes, createField } from '@/data/fieldTypes'
import type { FormField } from '@/types/fields'
import FieldItem from './FieldItem.vue'
import ToolBar from './ToolBar.vue'
import { defaultOptions } from '../config/defaultOptions'
import type { FormBuilderOptions } from '../config/types'
import LanguageSelect from './LanguageSelect.vue'

const props = defineProps<{
  options?: FormBuilderOptions
}>()

const options = reactive({ ...defaultOptions, ...props.options })
const formFields = ref<FormField[]>([])
const { t } = useI18n()

const { setLanguage } = useI18n()
setLanguage(options.language)

const cloneField = (el: FormField): FormField => createField(el)

const onDragStart = (evt: SortableEvent) => {}

const onDragEnd = (evt: SortableEvent) => {}

const onMove = (evt: any) => {}

const moveFieldUp = (index: number) => {
  if (index > 0) {
    const item = formFields.value.splice(index, 1)[0]
    formFields.value.splice(index - 1, 0, item)
  }
}

const moveFieldDown = (index: number) => {
  if (index < formFields.value.length - 1) {
    const item = formFields.value.splice(index, 1)[0]
    formFields.value.splice(index + 1, 0, item)
  }
}

const duplicateField = (field: FormField, index: number) => {
  const copy = { ...field, id: Date.now().toString() }
  formFields.value.splice(index + 1, 0, copy)
}

const editField = (field: FormField, index: number) => {
  console.log('Open edit dialog for:', field)
}
</script>

<template>
  <n-message-provider>
    <div class="min-h-screen flex">
      <main class="flex-1 relative p-6">
        <ToolBar :form-fields="formFields" @clear="formFields = []" @save="" />

        <div
          v-if="formFields.length === 0"
          class="absolute top-[70px] no-fields-message text-lg inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none select-none text-center px-4"
        >
          {{ t('canvas.placeholder') }}
        </div>

        <draggable
          id="drop-canvas"
          v-model="formFields"
          :group="{ name: 'fields', pull: false, put: true }"
          item-key="id"
          chosen-class="drop-chosen"
          :ghost-class="'drop-placeholder'"
          class="overflow-x-hidden shadow-xl mx-auto drop-area border-gray-500 gap-1 border-dashed rounded-lg p-2 flex flex-col bg-white dark:bg-gray-800"
          :animation="300"
          :class="[formFields.length == 0 ? 'border-2' : '']"
          tag="ul"
        >
          <template #item="{ element, index }">
            <FieldItem
              :element="element"
              :index="index"
              @delete="formFields.splice($event, 1)"
              @move-up="moveFieldUp"
              @move-down="moveFieldDown"
              @duplicate="duplicateField"
              @edit="editField"
            />
          </template>
        </draggable>
      </main>

      <aside class="w-1/4 border-l border-gray-200 dark:border-gray-700 p-4">
        <LanguageSelect />
        <draggable
          :list="fieldTypes"
          :group="{ name: 'fields', pull: 'clone', put: true }"
          item-key="type"
          :clone="cloneField"
          :sort="true"
          class="cursor-move m-0 p-0 flex flex-col gap-0 border border-gray-400 py-0 justify-start rounded bg-white dark:bg-gray-800 shadow-md"
          :animation="300"
          drag-class="dragging"
          chosen-class="drag-chosen"
          ghost-class="drag-placeholder"
          :force-fallback="true"
          tag="ul"
          :fallback-on-body="true"
        >
          <template #item="{ element }">
            <li
              :key="element.type"
              class="flex items-center border-b bg-white border-gray-400 py-[9px] px-2 gap-2 my-0 cursor-move hover:bg-gray-100"
            >
              <component :is="element.icon" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span
                ><span>{{ t(`field.${element.type}`) }}</span></span
              >
            </li>
          </template>
        </draggable>
      </aside>
    </div>
  </n-message-provider>
</template>
