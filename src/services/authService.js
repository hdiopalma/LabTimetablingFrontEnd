//services/authService.js

import axios from 'axios'
import { defineStore } from 'pinia'
import { useMainStore } from '@/stores/main.js'
import { AppConfig } from '@/services/appConfig'

const apiPath = 'api-token-auth/'

export const useAuthService = defineStore('auth', () => {
  const mainStore = useMainStore()
  const state = {
    token: localStorage.getItem(AppConfig.tokenKey || null),
  }

  const mutations = {
    setToken(token) {
      state.token = token
      if (token) {
        localStorage.setItem(AppConfig.tokenKey, token)
      }
    },

    clearToken() {
      state.token = null
      localStorage.removeItem(AppConfig.tokenKey)
    }
  }

  const actions = {

    isAuthenticated() {
      return state.token !== null
    },
    
    async login(credentials) {
      try {
        console.log(AppConfig.tokenKey)
        const response = await this.$apiURL.post(apiPath, credentials)
        mutations.setToken(response.data.token)
        mainStore.setUser({ name: credentials.username })
        return true
      } catch (error) {
        return false
      }
    },
    
    async logout() {
      mutations.clearToken()
      mainStore.setUser({ name: null })
    },

    async refreshToken() {
        try {
            const response = await axios.post('api-token-refresh', { token: state.token })
            mutations.setToken(response.data.token)
            return true
        } catch (error) {
            console.error('Error refreshing token:', error)
            return false
        }
        },
  }
  return {
    ...state,
    ...actions
  }
})
