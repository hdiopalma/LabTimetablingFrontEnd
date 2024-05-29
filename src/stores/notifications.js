import { defineStore } from 'pinia'
import { watch } from 'vue'
import Swal from 'sweetalert2'

import { useSolutionStore } from './solution'

const alert = (title, text) => {
  //toast notification
  Swal.fire({
    title: title,
    text: text,
    icon: 'info',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    showClass: {
      // popup: 'swal2-noanimation',
      backdrop: 'swal2-noanimation'
    },
  })
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: JSON.parse(localStorage.getItem('notifications')) || [],
    newNotificationStatus: JSON.parse(localStorage.getItem('newNotificationStatus')) || false
  }),
  getters: {
    getNotifications() {
      //reverse notifications so the newest is at the top
      return this.notifications.reverse()
    },
    getNewNotificationStatus() {
      return this.newNotificationStatus
    }
  },
  actions: {
    storeNotifications(notifications) {
      localStorage.setItem('notifications', JSON.stringify(notifications))
    },
    storeNewNotificationStatus(status) {
      localStorage.setItem('newNotificationStatus', JSON.stringify(status))
    },

    addNotification(notification) {
      //add id to notification
      notification.id = this.notifications.length
      this.notifications.push(notification)
      this.storeNotifications(this.notifications)
      this.setNewNotificationStatus(true)
      alert(notification.title, notification.message)
    },
    removeNotification(notification_id) {
      this.notifications = this.notifications.filter((notification) => notification.id !== notification_id)
      this.storeNotifications(this.notifications)
    },
    clearNotifications() {
      this.notifications = []
      this.storeNotifications(this.notifications)
    },
    setNewNotificationStatus(value) {
      this.newNotificationStatus = value
    },

    updateSolutionStore(){
      const solutionStore = useSolutionStore()
      solutionStore.fetchItems()
    },

    connect() {
      // Create a new WebSocket
      const chatSocket = new WebSocket(import.meta.env.VITE_WS_HOST + 'notification/')

      chatSocket.onopen = () => {
        console.log('WebSocket connection established.')
        const message = {
          message: 'Hello, world!'
        }
        // chatSocket.send(JSON.stringify(message));
      }

      chatSocket.onmessage = (event) => {
        // Parse the data
        const message = JSON.parse(event.data)
        // console.log('Received message:', message)
        this.addNotification(message)
      }

      chatSocket.onclose = (event) => {
        console.log('WebSocket connection closed:', event)
      }

      chatSocket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      return chatSocket
    },

    watchNewNotificationStatus() {
      watch(() => this.newNotificationStatus, (newStatus) => {
        //send notification status to parent component
        this.$emit('newNotificationStatus', newStatus)
      })
    }
  }
})
