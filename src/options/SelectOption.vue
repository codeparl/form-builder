<script setup lang="ts">
import { reactive } from 'vue'
import type { FormField } from '@/types/fields'

// Components
import TextInput from '@/components/inputs/TextInput.vue'
import ButtonInput from '@/components/inputs/ButtonInput.vue'

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
    <label class="block text-sm">Options</label>

    <!-- Render each option input -->
    <div v-for="(option, index) in selectOptions.items" :key="index" class="flex items-center gap-2">
      <TextInput
        v-model="selectOptions.items[index]"
        size="small"
        placeholder="Enter option"
        @input="syncModel"
        class="flex-1"
      />
      <ButtonInput
        size="tiny"
        class="bg-transparent border-0 hover:bg-transparent !text-red-600"
        type="error"
        @click="removeOption(index)"
      >
        <DeleteIcon />
      </ButtonInput>
    </div>

    <!-- Add option button -->
    <ButtonInput size="small" :is-outline="true" class="flex justify-between" type="success" @click="addOption">
      <PlusIcon />
      <span>Add Option</span>
    </ButtonInput>
  </div>
</template>
