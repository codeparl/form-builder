<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import TextInput from '@/components/inputs/TextInput.vue' // Your custom TextInput
import ButtonInput from '@/components/inputs/ButtonInput.vue' // Your custom ButtonInput
import PlusIcon from 'vue-material-design-icons/Plus.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Local reactive state for radio options
const radioOptions = reactive({
  items: model.value?.options || ['Option 1', 'Option 2', 'Option 3'],
  defaultValue: model.value?.defaultValue || '',
})

// Add a new blank option
const addOption = () => {
  radioOptions.items.push('')
  syncModel()
}

// Remove an option by index
const removeOption = (index: number) => {
  radioOptions.items.splice(index, 1)
  syncModel()
}

// Sync local options to model
const syncModel = () => {
  if (model.value) {
    model.value = {
      ...model.value,
      options: [...radioOptions.items],
      defaultValue: radioOptions.defaultValue,
    }
  }
}
syncModel()
// Watch defaultValue changes
watch(
  () => radioOptions.defaultValue,
  () => syncModel()
)
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <!-- Options -->
    <div>
      <label class="block text-sm">Options</label>

      <div v-for="(opt, index) in radioOptions.items" :key="index" class="flex items-center gap-2 mt-1">
        <TextInput
          v-model="radioOptions.items[index]"
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
      <ButtonInput size="small" :is-outline="true" class="flex justify-between mt-2" type="success" @click="addOption">
        <PlusIcon />
        <span>Add Option</span>
      </ButtonInput>
    </div>
  </div>
</template>
