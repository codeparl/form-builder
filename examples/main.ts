import { createApp } from 'vue'
import App from './App.vue'

// import your library directly from src while developing
import '../src/css/FormBuilder.css'
import FormBuilder from '../src'

createApp(App).use(FormBuilder).mount('#app')
