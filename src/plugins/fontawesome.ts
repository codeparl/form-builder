// src/plugins/fontawesome.ts
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { App } from 'vue'

// Add icons to the library

// Export a function to register globally
export function registerFontAwesome(app: App) {
  app.component('font-awesome-icon', FontAwesomeIcon)
}
