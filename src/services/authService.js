//services/authService.js

import axios from 'axios'
import { defineStore } from 'pinia'
import { useMainStore } from '@/stores/main.js'

const apiPath = 'api-token-auth'

export const useAuthService = defineStore('auth', () => {
  const mainStore = useMainStore()

  const state = {
    token: localStorage.getItem(TOKEN_KEY) || null,
    isAuthenticated: false
  }

  const mutations = {
    setToken(token) {
      state.token = token
      state.isAuthenticated = !!token
      if (token) {
        localStorage.setItem(this.$tokenKey, token)
      }
    },

    clearToken() {
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem(this.$tokenKey)
    }
  }

  const actions = {
    async login(credentials) {
      try {
        const response = await axios.post(apiPath, credentials)
        mutations.setToken(response.data.token)
        mainStore.setUser({ name: credentials.username })
        return true
      } catch (error) {
        console.error('Error logging in:', error)
        return false
      }
    },
    
    async logout() {
      mutations.clearToken()
      mainStore.setUser({ name: 'Hu Tao as a guest' })
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
