<script setup lang="ts">
import { reactive } from 'vue'
import type { FormField } from '@/types/fields'

// Icons
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import DeleteIcon from 'vue-material-design-icons/Close.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for select options
const selectOptions = reactive({
  items: model.value?.options || [],
})

// Add a new blank option
const addOption = () => {
  selectOptions.items.push('')
  syncModel()
}

// Remove an option by index
const removeOption = (index: number) => {
  selectOptions.items.splice(index, 1)
  syncModel()
}

// Update model when options change
const syncModel = () => {
  if (model.value) {
    model.value = {
      ...model.value,
      options: [...selectOptions.items],
    }
  }
}
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <label class="block text-sm text-gray-600 dark:text-gray-300">Options</label>

    <!-- Render each option input -->
    <div v-for="(option, index) in selectOptions.items" :key="index" class="flex items-center gap-2">
      <n-input
        v-model:value="selectOptions.items[index]"
        size="small"
        placeholder="Enter option"
        @input="syncModel"
        class="flex-1"
      />
      <n-button size="tiny" type="error" ghost @click="removeOption(index)">
        <template #icon>
          <delete-icon />
        </template>
      </n-button>
    </div>

    <!-- Add option button -->
    <n-button size="tiny" type="primary" ghost @click="addOption">
      <template #icon>
        <plus-icon />
      </template>
      Add Option
    </n-button>
  </div>
</template>
