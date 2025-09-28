import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import prefixer from 'postcss-prefix-selector'

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    prefixer({
      prefix: '.ub-vue-form-builder',
      transform: (prefix, selector, prefixedSelector) => {
        // don’t prefix global stuff
        if (selector.startsWith('html') || selector.startsWith('body') || selector.startsWith(':root')) {
          return selector
        }
        return prefixedSelector
      },
    }),
  ],
}
