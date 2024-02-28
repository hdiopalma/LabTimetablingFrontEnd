import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMainStore = defineStore('main', () => {

  // State
  const state = {
    userName: ref('Hu Tao'),
    userEmail: ref('hutaowansheng.com'),
    isFieldFocusRegistered: ref(false),
    clients: ref([]),
    history: ref([]),
    apiURL: null,
    localURL: null,
  }

  // Getters
  const getters = {
    userAvatar: computed(() => '/humaret.jpg')
  }

  // Actions
  function setUser(payload) {
    if (payload.name) state.userName.value = payload.name
    if (payload.email) state.userEmail.value = payload.email
  }

  function fetchSampleData(endpoint, target) {
    this.$localURL
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
    setApiURL: (url) => state.apiURL = url,
    setLocalURL: (url) => state.localURL = url,
  }

  return {
    ...state,
    ...getters,
    ...actions
  }
})
