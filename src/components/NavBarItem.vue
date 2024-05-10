<script setup>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import { RouterLink } from 'vue-router'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useMainStore } from '@/stores/main.js'
import { useNotificationsStore } from '@/stores/notifications'
import BaseIcon from '@/components/BaseIcon.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import NavBarMenuList from '@/components/NavBarMenuList.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import { defineProps, defineEmits } from 'vue'
import { useAuthService } from '@/services/authService'
import { useRouter } from 'vue-router'
import NavbarNotification from '@/components/NavbarNotification.vue'
import Swal from 'sweetalert2'

const authService = useAuthService()
const notificationsStore = useNotificationsStore()
const router = useRouter()
const isAuthenticated = computed(() => authService.isAuthenticated())

const props = defineProps({
  item: {
    type: Object, //icon, label, to, href, target, menu, isDesktopNoLabel, isCurrentUser, isDivider, isLogout, needAuth
    required: true
  }
})

const emit = defineEmits(['menu-click'])

const is = computed(() => {
  if (props.item.href) {
    return 'a'
  }

  if (props.item.to) {
    return RouterLink
  }

  return 'div'
})

const componentClass = computed(() => {
  const base = [
    isDropdownActive.value
      ? `navbar-item-label-active dark:text-slate-400`
      : `navbar-item-label dark:text-white dark:hover:text-slate-400`,
    props.item.menu ? 'lg:py-2 lg:px-3' : 'py-2 px-3'
  ]

  if (props.item.isDesktopNoLabel) {
    base.push('lg:w-16', 'lg:justify-center')
  }

  return base
})

const itemLabel = computed(() =>
  props.item.isCurrentUser ? useMainStore().userName : props.item.label
)

const isDropdownActive = ref(false)

const menuClick = (event) => {
  emit('menu-click', event, props.item)

  if (props.item.menu) {
    isDropdownActive.value = !isDropdownActive.value
  }

  if (props.item.isLogout) {
    handleLogout()
  }

  // if (props.item.isNotification) {
  //   notificationClick(event)
  // }
}

const menuClickDropdown = (event, item) => {
  emit('menu-click', event, item)
}

const isNotificationActive = ref(false)
const newNotification = computed(() => {
  return notificationsStore.newNotificationStatus
})

const notificationClick = (event) => {
  if (event) {
    if (isNotificationActive.value === false) {
      isNotificationActive.value = !isNotificationActive.value
      setTimeout(() => {
        const notification = document.getElementById('notification')
        notification.focus()
        notificationsStore.setNewNotificationStatus(false)
        console.log(newNotification)
      }, 100)
      
    } else {
      isNotificationActive.value = !isNotificationActive.value
    }
  }
}

const root = ref(null)

const forceClose = (event) => {
  if (root.value && !root.value.contains(event.target)) {
    isDropdownActive.value = false
    isNotificationActive.value = false
  }
}

onMounted(() => {
  if (props.item.menu) {
    window.addEventListener('click', forceClose)
  }
})

onBeforeUnmount(() => {
  if (props.item.menu) {
    window.removeEventListener('click', forceClose)
  }
})

const handleLogout = async () => {
  Swal.fire({
    title: 'Logout',
    text: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Logging out...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading(), logout()
        }
      })
    } else if (result.isDenied) {
      Swal.fire('Logout cancelled', '', 'info')
    }
  })
}

const handleLogoutSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: 'Goodbye!',
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500
  })
}

const logout = async () => {
  try {
    await authService.logout()
    handleLogoutSuccess()
    router.push('/login')
  } catch (error) {
    handleLoginError(error)
  }
}
</script>

<template>
  <BaseDivider v-if="item.isDivider" nav-bar />
  <component
    :is="is"
    v-else
    ref="root"
    class="block lg:flex items-center relative cursor-pointer"
    :class="componentClass"
    :to="item.to ?? null"
    :href="item.href ?? null"
    :target="item.target ?? null"
    @click="menuClick"
    v-if="item.needAuth == null ? true : item.needAuth === isAuthenticated"
  >
    <div
      class="flex items-center"
      :class="{
        'bg-gray-100 dark:bg-slate-800 lg:bg-transparent lg:dark:bg-transparent p-3 lg:p-0':
          item.menu
      }"
      @click="notificationClick(item.isNotification)"
    >

    <div v-if="item.isNotification && newNotification"
    class="w-3 h-3 bg-red-500 rounded-full absolute lg:right-1/2 lg:bottom-1/2 animate-ping">
      <span class="sr-only">Notification</span>
    </div>

      <UserAvatarCurrentUser
        v-if="item.isCurrentUser"
        class="w-6 h-6 mr-3 inline-flex"
        frame-shape="full"
      />

      <BaseIcon v-if="item.icon" :path="item.icon" class="transition-colors" />

      <span
        class="px-2 transition-colors"
        :class="{ 'lg:hidden': item.isDesktopNoLabel && item.icon }"
        >{{ itemLabel }}</span
      >
      <BaseIcon
        v-if="item.menu"
        :path="isDropdownActive ? mdiChevronUp : mdiChevronDown"
        class="hidden lg:inline-flex transition-colors"
      />
    </div>
    <div
      v-if="item.menu"
      class="text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg lg:dark:bg-slate-800 dark:border-slate-700"
      :class="{ 'lg:hidden': !isDropdownActive }"
    >
      <NavBarMenuList :menu="item.menu" @menu-click="menuClickDropdown" />
    </div>

    <div
      v-if="isNotificationActive"
      class="text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg lg:dark:bg-slate-800 dark:border-slate-700"
    >
      <NavbarNotification @focusout="isNotificationActive = false" />
    </div>

  </component>
</template>
