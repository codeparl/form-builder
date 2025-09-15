import TextField from '@/components/fields/TextField.vue'
import TextAreaField from '@/components/fields/TextAreaField.vue'
import SelectField from '@/components/fields/SelectField.vue'
import CheckboxField from '@/components/fields/CheckboxField.vue'
import RadioField from '@/components/fields/RadioField.vue'
import HeadingField from '@/components/fields/HeadingField.vue'
import ParagraphField from '@/components/fields/ParagraphField.vue'
import SectionField from '@/components/fields/SectionField.vue'

export const fieldComponentMap: Record<string, any> = {
  text: TextField,
  textarea: TextAreaField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  heading: HeadingField,
  paragraph: ParagraphField,
  section: SectionField,
}
