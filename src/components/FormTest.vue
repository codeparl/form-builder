<!-- Canvas -->
<CanvasComponent
  v-model:sections="formSections"
  @move-up="moveFieldUp"
  @move-down="moveFieldDown"
  @duplicate="duplicateField"
  @edit="editField"
  @drag-start="onDragStart"
  @drag-end="onDragEnd"
  @move="onMove"
/>
<Palette :field-types="fieldTypes" :clone-field="cloneField" />
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
                <span>{{ t(`field.${element.type}`) }}</span>
              </li>
            </template>
          </draggable>
