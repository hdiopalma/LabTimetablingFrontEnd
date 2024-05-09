import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useSemesterStore } from './stores/semester'

import { AppConfig } from './services/appConfig'

import '@/stores/notifications'

const tokenKey = AppConfig.tokenKey
const apiURL = AppConfig.apiURL
const localURL = AppConfig.localURL

//add auth header
apiURL.interceptors.request.use((config) => {
  const token = localStorage.getItem(tokenKey)
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

import './css/main.css'

// Create Vue app
const app = createApp(App)

// Init Pinia, store the API and local URLs so they can be accessed from any store.
const pinia = createPinia()
pinia.use(({ store }) => {
  store.$apiURL = apiURL
  store.$localURL = localURL
  store.$tokenKey = tokenKey
})

app.use(pinia)
app.use(router)

// Init main store
const mainStore = useMainStore(pinia)
const semesterStore = useSemesterStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()
semesterStore.fetchActiveSemester('all')

app.directive('click-outside', {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})


app.mount('#app')

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
