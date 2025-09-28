import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import dts from 'vite-plugin-dts'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(), // compile .vue components
    AutoImport({
      imports: ['vue'],
      dts: 'auto-imports.d.ts',
      vueTemplate: true,
    }),
    Components({
      dts: 'components.d.ts',
    }),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    commonjsOptions: {
      esmExternals: true,
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'FormBuilder',
      formats: ['es', 'umd'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'], // do not bundle Vue or Naive
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
        interop: 'esModule',
      },
    },
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.vue', '.ts', '.js', '.json'],
  },
})
