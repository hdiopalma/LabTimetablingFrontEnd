<script setup>
import {mdiClose, mdiTrashCan } from '@mdi/js'

import { useNotificationsStore } from '@/stores/notifications'

import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { defineProps, defineEmits, ref, computed, onMounted, reactive } from 'vue'

const notifications = useNotificationsStore()

const props = defineProps({
  menu: {
    type: Array,
    default: () => []
  },
  open: {
    type: Boolean,
    default: false
  }
})

const message = ref(notifications.getNotifications)

const emit = defineEmits(['focusout'])
const unFocusAble = ref(false)
const handLeUnfocus = (e) => {
  if (unFocusAble.value) {
    emit('focusout', e)
    console.log('unfocus')
  }
}
const clearAll = () => {
  unFocusAble.value = false
  message.value = []
  notifications.clearNotifications()
  setTimeout(() => {
    unFocusAble.value = true
  }, 100)
}
const closeClick = (e, item) => {
  e.preventDefault()
  unFocusAble.value = false
  message.value = message.value.filter((msg) => msg.id !== item.id)
  notifications.removeNotification(item.id)
  setTimeout(() => {
    unFocusAble.value = true
  }, 100)
}

onMounted(() => {
  //timeout to prevent the click event from being triggered
  setTimeout(() => {
    unFocusAble.value = true
  }, 100)
})



</script>

<template>
  <div class="absolute right-0 w-80 mt-2 dark:bg-slate-900 bg-white rounded-lg shadow-lg z-10 focus:outline-none"
  tabindex="0" v-click-outside="handLeUnfocus"  
  id="notification">
    <div class="p-4 border-b border-gray-200 dark:border-slate-700">
      <div class="flex items-center justify-between" v-if="message.length > 0">
        <h1 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Notification</h1>
        <button @click="clearAll" class="text-gray-600 hover:text-gray-800">
          <BaseIcon :path="mdiTrashCan" class="w-4 h-4 text-red-500" />
        </button>
      </div>
      <div class="flex items-center justify-center" v-else>
        <h1 class="text-lg font-semibold text-gray-800 dark:text-gray-200"> 
          No Notification</h1>
      </div>
    </div>
    <div class="max-h-96 overflow-y-auto">
      <div v-for="item in message" :key="item.id" class="p-2 border-b border-gray-200 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-slate-800 dark:border-slate-700">
        <div class="p-2">
          <div class="flex items-center justify-between">
            <h1 class="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {{ item.title }}
            </h1>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ item.message }}
          </p>
        </div>
        <div>
          <button @click="closeClick($event, item)" class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
            <BaseIcon :path="mdiClose" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Notification Navbar Popup -->
</template>
