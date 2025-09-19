import TextOptions from '@/options/TextOptions.vue'
import SelectOptions from '@/options/SelectOption.vue'
import ButtonOption from '@/options/ButtonOption.vue'

export const fieldOptions: Record<string, any> = {
  text: TextOptions,
  select: SelectOptions,
  button: ButtonOption,
  checkbox: null, // no extra options
  radio: null,
  // add others
}
