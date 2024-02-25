import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useAssistantStore } from './stores/assistant'
import { useLabStore } from './stores/lab'

import axios from 'axios'

const apiURL = axios.create({
  baseURL: 'http://localhost:8000/'
})

const localURL = axios.create({
  baseURL: axios.defaults.baseURL
})

import './css/main.css'

// Create Vue app
const app = createApp(App)

app.config.globalProperties.$apiURL = apiURL
app.config.globalProperties.$localURL = localURL

app.use(router)

// Init Pinia
const pinia = createPinia()
pinia.use(({ store }) => {
  store.$apiURL = apiURL
  store.$localURL = localURL
})

app.use(pinia)
app.mount('#app')

// Init main store
const mainStore = useMainStore(pinia)
const assistantStore = useAssistantStore(pinia)
const labStore = useLabStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Dark mode
// Uncomment, if you'd like to restore persisted darkMode setting, or use `prefers-color-scheme: dark`. Make sure to uncomment localStorage block in src/stores/darkMode.js
// import { useDarkModeStore } from './stores/darkMode'

// const darkModeStore = useDarkModeStore(pinia)

// if (
//   (!localStorage['darkMode'] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
//   localStorage['darkMode'] === '1'
// ) {
//   darkModeStore.set(true)
// }

// Default title tag
const defaultDocumentTitle = 'LAB JTE'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
