<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FormField } from '@/types/fields'
import TextInput from '@/components/inputs/TextInput.vue'
import ButtonInput from '@/components/inputs/ButtonInput.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

// v-model binding for the field
const model = defineModel<FormField>('value')

// Reactive state for radio options
const radioOptions = reactive({
  items: model.value?.options?.map((opt: any) => {
    if (typeof opt === 'string') return { label: opt, value: opt }
    return { label: opt.label, value: opt.value }
  }) || [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  defaultValue: model.value?.defaultValue || '',
})

// Add a new blank option
const addOption = () => {
  radioOptions.items.push({ label: '', value: '' })
  syncModel()
}

// Remove an option by index
const removeOption = (index: number) => {
  radioOptions.items.splice(index, 1)
  syncModel()
}

// Sync reactive options to the model
const syncModel = () => {
  if (model.value) {
    model.value.options = radioOptions.items.map(item => ({ ...item }))
    model.value.defaultValue = radioOptions.defaultValue
  }
}

// Watch defaultValue changes
watch(() => radioOptions.defaultValue, () => syncModel())
</script>

<template>
  <div class="p-0 space-y-3 w-full max-w-sm">
    <!-- Options -->
    <div>
      <label class="block text-sm font-medium mb-1">Options</label>

      <div v-for="(opt, index) in radioOptions.items" :key="index" class="flex items-center gap-2 mt-1">
        <!-- Label input -->
        <TextInput v-model="radioOptions.items[index].label" size="small" placeholder="Option label" @input="syncModel"
          class="flex-1" />

        <!-- Value input -->
        <TextInput v-model="radioOptions.items[index].value" size="small" placeholder="Option value" @input="syncModel"
          class="flex-1" />

        <!-- Remove button -->
        <ButtonInput size="tiny" class="bg-transparent border-0 hover:bg-transparent !text-red-600" type="error"
          @click="removeOption(index)">
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
