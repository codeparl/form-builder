import ButtonInput from '@/components/inputs/ButtonInput.vue'
import CheckboxInput from '@/components/inputs/CheckboxInput.vue'
import RadionGroup from '@/components/inputs/RadionGroup.vue'
import SelectInput from '@/components/inputs/SelectInput.vue'
import TextareaInput from '@/components/inputs/TextareaInput.vue'
import TextInput from '@/components/inputs/TextInput.vue'

export const inputMap: Record<string, any> = {
  text: TextInput,
  number: TextInput,
  textarea: TextareaInput,
  select: SelectInput,
  checkbox: CheckboxInput,
  radio: RadionGroup,
  button: ButtonInput,
}
