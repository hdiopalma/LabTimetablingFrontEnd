import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { AppConfig } from '@/services/appConfig'
import { useDarkModeStore } from '@/stores/darkMode.js'

export const useMainStore = defineStore('main', () => {

  // State
  const state = {
    userName: localStorage.getItem('userName') ? ref(JSON.parse(localStorage.getItem('userName'))) : ref('Hu Tao as a guest'),
    userEmail: localStorage.getItem('userEmail') ? ref(JSON.parse(localStorage.getItem('userEmail'))) : ref('hutaowansheng.com'),
    isFieldFocusRegistered: ref(false),
    clients: ref([]),
    history: ref([]),
  }

  //Dark Mode
// Initialize dark mode setting from localStorage when the application starts
  const darkModeStore = useDarkModeStore();
  darkModeStore.set(localStorage.getItem('darkMode') ? localStorage.getItem('darkMode') === '1' : false);

  // Getters
  const getters = {
    userAvatar: computed(() => '/taopattern.jpg'),
    assetImage: (file) => '/assets/' + file,
  }

  // Actions
  function setUser(payload) {
    if (payload.name) {
      state.userName.value = payload.name
      localStorage.setItem('userName', JSON.stringify(state.userName.value))
    } else {
      state.userName.value = 'Hu Tao as a guest'
      localStorage.setItem('userName', JSON.stringify(state.userName.value))
    }

    if (payload.email) {
      state.userEmail.value = payload.email
      localStorage.setItem('userEmail', JSON.stringify(state.userEmail.value))
    } else {
      state.userEmail.value = 'hutaowansheng.com'
      localStorage.setItem('userEmail', JSON.stringify(state.userEmail.value))
    }
  }

  function fetchSampleData(endpoint, target) {
    AppConfig.localURL
      .get(endpoint)
      .then((result) => {
        state[target].value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const actions = {
    setUser,
    fetchSampleClients: () => fetchSampleData('data-sources/clients.json?v=3', 'clients'),
    fetchSampleHistory: () => fetchSampleData('data-sources/history.json', 'history'),
  }

  return {
    ...state,
    ...getters,
    ...actions
  }
})
