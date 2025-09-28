import { type App, defineAsyncComponent, type Component } from 'vue'

export default {
  install(app: App) {
    // const components = import.meta.glob('../components/inputs/*.vue')
    // for (const path in components) {
    //   const loader = components[path] as () => Promise<Component>
    //   if (!loader) continue // just in case
    //   const componentName = path
    //     .split('/')
    //     .pop()!
    //     .replace(/\.\w+$/, '')
    //   app.component(componentName, defineAsyncComponent(loader))
    // }
  },
}
