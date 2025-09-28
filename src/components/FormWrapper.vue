<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps<{
  label?: string
  path?: string
  required?: boolean
}>()

const formContext = inject<any>('formContext', null)

const value = computed({
  get: () => (props.path ? formContext?.model[props.path] : null),
  set: val => {
    if (props.path && formContext) {
      formContext.model[props.path] = val
    }
  },
})
</script>

<template>
  <div
    class="w-full h-full"
    :class="[formContext?.labelPlacement === 'left' ? 'flex items-center gap-4' : 'flex flex-col gap-1']"
  >
    <!-- Label -->
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Field slot -->
    <slot :value="value" :update="(v: any) => (value.value = v)" />
  </div>
</template>
