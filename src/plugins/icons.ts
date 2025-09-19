import type { App } from 'vue'

// Import only the icons you actually use in your library
import ArrowUp from 'vue-material-design-icons/ArrowUpThin.vue'
import ArrowDown from 'vue-material-design-icons/ArrowDownThin.vue'
import DeleteIcon from 'vue-material-design-icons/DeleteOutline.vue'
import DuplicateIcon from 'vue-material-design-icons/ContentDuplicate.vue'
import EditIcon from 'vue-material-design-icons/PencilOutline.vue'
import DeleteSweepIcon from 'vue-material-design-icons/DeleteSweepOutline.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'

// Export them so you can reuse if needed
export const icons = {
  ArrowUp,
  ArrowDown,
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  DeleteSweepIcon,
  ChevronRightIcon,
  ChevronDownIcon,
}

export function registerIcons(app: App) {
  Object.entries(icons).forEach(([name, component]) => {
    app.component(name, component)
  })
}
