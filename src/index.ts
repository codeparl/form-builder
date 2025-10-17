import type { App } from 'vue'
import FormBuilder from './components/FormBuilder.vue'
import FormRenderer from './components/FormRenderer.vue'
import SectionRenderer from './components/SectionRenderer.vue'
import { registerIcons } from './plugins/icons'
import AutoInputs from './plugins/autoInputs'
import '@/css/FormBuilder.css'
import { createPinia } from 'pinia'

const pinia = createPinia()
const FormBuilderPlugin = {
  install(app: App) {
    app.use(pinia)
    // Register all components
    app.component('FormBuilder', FormBuilder)
    app.use(AutoInputs)
    registerIcons(app)
  },
}

export { FormBuilder, FormRenderer, SectionRenderer }
export default FormBuilderPlugin
export * from '@/store/theme'
export * from '@/store/formBuilder'
