import TextField from '@/components/fields/TextField.vue'
import TextAreaField from '@/components/fields/TextAreaField.vue'
import SelectField from '@/components/fields/SelectField.vue'
import CheckboxField from '@/components/fields/CheckboxField.vue'
import RadioField from '@/components/fields/RadioField.vue'
import HeadingField from '@/components/fields/HeadingField.vue'
import ParagraphField from '@/components/fields/ParagraphField.vue'
import Button from '@/components/fields/Button.vue'
import DateField from '@/components/fields/DateField.vue'
import FileField from '@/components/fields/FileField.vue'
import SectionField from '@/components/fields/SectionField.vue'
import NumberField from './NumberField.vue'
import HiddenField from './HiddenField.vue'

export const fieldComponentMap: Record<string, any> = {
  text: TextField,
  number: NumberField,
  hidden: HiddenField,
  textarea: TextAreaField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  heading: HeadingField,
  paragraph: ParagraphField,
  button: Button,
  date: DateField,
  file: FileField,
  section: SectionField,
}
