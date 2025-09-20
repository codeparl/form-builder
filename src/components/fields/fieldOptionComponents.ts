import TextOptions from '@/options/TextOptions.vue'
import SelectOptions from '@/options/SelectOption.vue'
import ButtonOption from '@/options/ButtonOption.vue'
import TextareaOption from '@/options/TextareaOption.vue'
import CheckboxOption from '@/options/CheckboxOption.vue'
import RadioOption from '@/options/RadioOption.vue'
import DateOption from '@/options/DateOption.vue'
import FileOption from '@/options/FileOption.vue'
import HeadingOption from '@/options/HeadingOption.vue'
import ParagraphOption from '@/options/ParagraphOption.vue'
import NumberOptions from '@/options/NumberOptions.vue'
import HiddenOptions from '@/options/HiddenOptions.vue'

export const fieldOptions: Record<string, any> = {
  text: TextOptions,
  select: SelectOptions,
  button: ButtonOption,
  textarea: TextareaOption,
  checkbox: CheckboxOption,
  radio: RadioOption,
  date: DateOption,
  file: FileOption,
  heading: HeadingOption,
  paragraph: ParagraphOption,
  number: NumberOptions,
  hidden: HiddenOptions,
}
