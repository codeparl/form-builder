// src/index.ts
import type { App } from 'vue'

// Import your components
import FormBuilderComponent from './components/FormBuilder.vue'
import { registerIcons } from './plugins/icons'
import naive from 'naive-ui'
import './css/theme.css'
import './css/FormBuilder.css'

// List all components here
const components = [FormBuilderComponent]

// Export components individually
export { FormBuilderComponent }

// Export as a plugin for Vue.use()
export default {
  install(app: App) {
    app.use(naive)
    // Register all library components
    components.forEach(component => {
      if (component.name) {
        app.component(component.name, component)
      }
    })

    registerIcons(app)
  },
}
